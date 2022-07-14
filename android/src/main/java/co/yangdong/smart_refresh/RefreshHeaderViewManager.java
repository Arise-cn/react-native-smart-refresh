package co.yangdong.smart_refresh;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class RefreshHeaderViewManager extends ViewGroupManager<RefreshHeaderView> {
    final String CLASS_NAME = "RNRefreshHeader";
    @NonNull
    @Override
    public String getName() {
        return CLASS_NAME;
    }

    @NonNull
    @Override
    protected RefreshHeaderView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new RefreshHeaderView(reactContext);
    }
}
