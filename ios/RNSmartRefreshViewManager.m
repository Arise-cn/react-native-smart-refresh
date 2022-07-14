#import "RNSmartRefreshViewManager.h"

@implementation RNSmartRefreshViewManager

RCT_EXPORT_MODULE(RNSmartRefreshView);


RCT_EXPORT_METHOD(autoRefresh:(nonnull NSNumber*) reactTag) {
	[self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
		RNRefreshView *view = (RNRefreshView *) viewRegistry[reactTag];
		if (!view || ![view isKindOfClass:[RNRefreshView class]]) {
			return;
		}
		[view beginRefreshing];
	}];
}

RCT_EXPORT_VIEW_PROPERTY(onChangeState, RCTDirectEventBlock);

RCT_EXPORT_VIEW_PROPERTY(onChangeOffset, RCTDirectEventBlock);

RCT_EXPORT_VIEW_PROPERTY(refreshing, BOOL);

- (UIView *)view{
    RNRefreshView *view = [[RNRefreshView alloc] init];
	return view;
}
@end
