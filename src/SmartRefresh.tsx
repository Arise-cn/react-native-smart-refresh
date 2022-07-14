import React, { Component } from 'react';
import {
  findNodeHandle,
  Platform,
  requireNativeComponent,
  StyleProp,
  StyleSheet,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';

export type RefreshState = 0 | 1 | 2;

export interface OnChangeStateEvent {
  nativeEvent: { state: RefreshState };
}

export interface OnChangeOffsetEvent {
  nativeEvent: { offset: number };
}

type RNSmartRefreshProps = {
  onRefresh?: () => void;
  onChangeState?: (event: OnChangeStateEvent) => void;
  onChangeOffset?: (event: OnChangeOffsetEvent) => void;
  refreshing: boolean;
  firstRefresh?: boolean;
};

const RNSmartRefresh =
  requireNativeComponent<RNSmartRefreshProps>('RNSmartRefreshView');

export interface SmartRefreshProps extends RNSmartRefreshProps {
  style?: StyleProp<ViewStyle>;
}

export class SmartRefresh extends Component<SmartRefreshProps> {
  smartRefresh: any | null = null;

  static defaultProps = {
    style:
      Platform.OS === 'android'
        ? { flex: 1 }
        : { position: 'absolute', left: 0, top: 0, right: 0 },
    onRefresh: () => {},
    onChangeOffset: () => {},
    refreshing: false,
  };

  componentDidMount() {
    const { firstRefresh } = this.props;
    if (firstRefresh) {
      this.autoRefresh();
    }
  }

  autoRefresh = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.smartRefresh),
      'autoRefresh',
      []
    );
  };

  render() {
    const { children, ...otherProps } = this.props;

    if (Platform.OS === 'android') {
      return (
        <View style={styles.container}>
          <RNSmartRefresh
            ref={(ref) => (this.smartRefresh = ref)}
            {...otherProps}
          >
            {children}
          </RNSmartRefresh>
        </View>
      );
    }

    return (
      <RNSmartRefresh ref={(ref) => (this.smartRefresh = ref)} {...otherProps}>
        {children}
      </RNSmartRefresh>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
});
