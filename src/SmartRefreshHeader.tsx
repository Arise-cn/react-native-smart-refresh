import React, { Component } from 'react';
import {
  View,
  requireNativeComponent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export interface RNSmartRefreshHeaderProps {
  children?: React.ReactNode;
}

export interface SmartRefreshHeaderProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const RNSmartRefreshHeader =
  requireNativeComponent<RNSmartRefreshHeaderProps>('RNRefreshHeader');

export class SmartRefreshHeader extends Component<SmartRefreshHeaderProps> {
  render() {
    const { children, style } = this.props;
    return (
      <RNSmartRefreshHeader>
        <View style={StyleSheet.compose({ height: 100 }, style)}>
          {children}
        </View>
      </RNSmartRefreshHeader>
    );
  }
}
