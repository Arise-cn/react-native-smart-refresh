#import "RNRefreshHeaderManager.h"

@implementation RNRefreshHeaderManager
RCT_EXPORT_MODULE(RNRefreshHeader)
- (UIView *)view {
    return [[RNRefreshHeader alloc] init];
}
@end
