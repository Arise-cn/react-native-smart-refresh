import React, { Component } from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  Text,
  StyleSheet,
  ActivityIndicatorProps,
  ImageSourcePropType,
  ViewStyle,
  StyleProp,
  ImageStyle,
  TextStyle,
} from 'react-native';
import Dayjs from 'dayjs';
import { OnChangeStateEvent, SmartRefresh } from './SmartRefresh';
import { SmartRefreshHeader } from './SmartRefreshHeader';

export interface NormalRefreshHeaderProps {
  refreshing: boolean;
  firstRefresh?: boolean;
  onRefresh?: () => void;
  activityIndicatorProps?: ActivityIndicatorProps;
  arrowIcon?: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  timeStyle?: StyleProp<TextStyle>;
}

interface NormalRefreshHeaderState {
  title: string;
  lastTime: string;
}

export class NormalRefreshHeader extends Component<
  NormalRefreshHeaderProps,
  NormalRefreshHeaderState
> {
  rotateAnimated: Animated.Value = new Animated.Value(0);
  smartRefreshRef: SmartRefresh | null = null;
  state: Readonly<NormalRefreshHeaderState> = {
    title: '下拉刷新 ',
    lastTime: Dayjs().format('HH:mm'),
  };

  private setTitle = (title: string) => {
    this.setState({ title });
  };

  private setLastTime = (lastTime: string) => {
    this.setState({ lastTime });
  };

  private onPullingRefreshCallBack = () => {
    Animated.timing(this.rotateAnimated, {
      toValue: -180,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
    this.setTitle('松开立即刷新');
  };

  private onRefreshCallBack = () => {
    const { onRefresh } = this.props;
    onRefresh && onRefresh();
    this.setLastTime(Dayjs().format('HH:mm'));
    this.setTitle('正在刷新...');
  };

  private onIdleRefreshCallBack = () => {
    Animated.timing(this.rotateAnimated, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
    this.setTitle('下拉刷新');
  };

  private onChangeStateCallBack = (event: OnChangeStateEvent) => {
    const { state } = event.nativeEvent;
    switch (state) {
      case 0:
        this.onIdleRefreshCallBack();
        break;
      case 1:
        this.onPullingRefreshCallBack();
        break;
      case 2:
        this.onRefreshCallBack();
        break;
      default:
    }
  };

  autoRefresh = () => {
    !!this.smartRefreshRef && this.smartRefreshRef.autoRefresh();
  };

  render(): React.ReactNode {
    const {
      refreshing,
      firstRefresh,
      children,
      activityIndicatorProps,
      arrowIcon,
      containerStyle,
      titleStyle,
      timeStyle,
      leftContainerStyle,
      rightContainerStyle,
      imageStyle,
    } = this.props;
    const { title, lastTime } = this.state;

    return (
      <SmartRefresh
        ref={(ref) => (this.smartRefreshRef = ref)}
        refreshing={refreshing}
        firstRefresh={firstRefresh}
        onChangeState={this.onChangeStateCallBack}
      >
        <SmartRefreshHeader style={[styles.container, containerStyle]}>
          <View style={[styles.leftContainer, leftContainerStyle]}>
            <Animated.Image
              style={[
                styles.image,
                imageStyle,
                {
                  opacity: refreshing ? 0 : 1,
                  transform: [
                    {
                      rotate: this.rotateAnimated.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                },
              ]}
              source={arrowIcon || require('./assets/icon_down_arrow.png')}
            />
            <ActivityIndicator
              style={{ opacity: refreshing ? 1 : 0 }}
              animating={true}
              size="small"
              hidesWhenStopped={true}
              {...activityIndicatorProps}
            />
          </View>
          <View style={[styles.rightContainer, rightContainerStyle]}>
            <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
            <Text
              style={[styles.timeStyle, timeStyle]}
            >{`最后更新：${lastTime}`}</Text>
          </View>
        </SmartRefreshHeader>
        {children}
      </SmartRefresh>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 16,
    color: '#333',
  },
  timeStyle: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  leftContainer: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
