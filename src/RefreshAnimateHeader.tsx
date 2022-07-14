import React, { Component } from 'react';
import { StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';
import LottieView, {
  AnimatedLottieViewProps,
  AnimationObject,
} from 'lottie-react-native';
import {
  OnChangeOffsetEvent,
  OnChangeStateEvent,
  RefreshState,
  SmartRefresh,
} from './SmartRefresh';
import { SmartRefreshHeader } from './SmartRefreshHeader';

export interface RefreshAnimateHeaderProps {
  refreshing: boolean;
  firstRefresh?: boolean;
  onRefresh?: () => void;
  source?:
    | string
    | AnimationObject
    | {
        uri: string;
      };
  containerStyle?: StyleProp<ViewStyle>;
  lottieStyle?: StyleProp<ViewStyle>;
  lottieOptions?: AnimatedLottieViewProps;
}

interface RefreshAnimateHeaderState {
  currentState: RefreshState;
}

export class RefreshAnimateHeader extends Component<
  RefreshAnimateHeaderProps,
  RefreshAnimateHeaderState
> {
  offsetAnimated: Animated.Value = new Animated.Value(0);
  smartRefreshRef: SmartRefresh | null = null;
  lottieRef: LottieView | null = null;
  state: Readonly<RefreshAnimateHeaderState> = { currentState: 0 };

  private setCurrentState = (currentState: RefreshState) => {
    this.setState({ currentState });
  };

  private onRefreshCallBack = () => {
    const { onRefresh } = this.props;
    !!this.lottieRef && this.lottieRef.play();
    !!onRefresh && onRefresh();
  };

  private onIdleRefreshCallBack = () => {
    !!this.lottieRef && this.lottieRef.reset();
  };

  private onChangeStateCallBack = (event: OnChangeStateEvent) => {
    const { state } = event.nativeEvent;
    this.setCurrentState(state);
    switch (state) {
      case 0:
        this.onIdleRefreshCallBack();
        break;
      case 2:
        this.onRefreshCallBack();
        break;
      default:
    }
  };

  private onChangeOffsetCallBack = (event: OnChangeOffsetEvent) => {
    const { offset } = event.nativeEvent;
    const { currentState } = this.state;

    if (currentState === 0 || currentState === 1) {
      this.offsetAnimated.setValue(offset);
    }
  };

  autoRefresh = () => {
    !!this.smartRefreshRef && this.smartRefreshRef.autoRefresh();
  };

  render(): React.ReactNode {
    const {
      refreshing,
      firstRefresh,
      source,
      containerStyle,
      lottieStyle,
      lottieOptions,
      children,
    } = this.props;

    return (
      <SmartRefresh
        ref={(ref) => (this.smartRefreshRef = ref)}
        refreshing={refreshing}
        firstRefresh={firstRefresh}
        onChangeState={this.onChangeStateCallBack}
        onChangeOffset={this.onChangeOffsetCallBack}
      >
        <SmartRefreshHeader style={[styles.container, containerStyle]}>
          <LottieView
            ref={(ref) => (this.lottieRef = ref)}
            style={[styles.lottery, lottieStyle]}
            resizeMode={'cover'}
            loop={true}
            autoSize={false}
            autoPlay={false}
            speed={2}
            hardwareAccelerationAndroid={true}
            cacheStrategy={'strong'}
            progress={this.offsetAnimated.interpolate({
              inputRange: [0, 300],
              outputRange: [0, 1],
            })}
            {...lottieOptions}
            source={source || require('./assets/cycle_animation.json')}
          />
        </SmartRefreshHeader>
        {children}
      </SmartRefresh>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottery: {
    height: 80,
  },
});
