import { requireNativeComponent, ViewStyle } from 'react-native';

type ReactNativeSmartRefreshProps = {
  color: string;
  style: ViewStyle;
};

export const ReactNativeSmartRefreshViewManager = requireNativeComponent<ReactNativeSmartRefreshProps>(
'ReactNativeSmartRefreshView'
);

export default ReactNativeSmartRefreshViewManager;
