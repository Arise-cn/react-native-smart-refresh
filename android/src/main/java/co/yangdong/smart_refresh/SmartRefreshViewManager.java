package co.yangdong.smart_refresh;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import java.util.Map;

public class SmartRefreshViewManager extends ViewGroupManager<SmartRefreshView> {
    public static final String REACT_CLASS = "RNSmartRefreshView";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected SmartRefreshView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new SmartRefreshView(reactContext);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        String onChangeStateEvent = SmartRefreshView.EVENT_NAME_CHANGE_STATE;
        String onChangeOffsetEvent = SmartRefreshView.EVENT_NAME_CHANGE_OFFSET;
        return MapBuilder.<String, Object>builder()
                .put(onChangeStateEvent, MapBuilder.of("registrationName", onChangeStateEvent))
                .put(onChangeOffsetEvent, MapBuilder.of("registrationName", onChangeOffsetEvent)).build();
    }

    @Override
    public void receiveCommand(@NonNull SmartRefreshView root, String commandId, @Nullable ReadableArray args) {
        if ("autoRefresh".equals(commandId)) {
            root.autoRefresh(0, 500, 1.0f, false);
        } else {
            super.receiveCommand(root, commandId, args);
        }

    }

    @SuppressWarnings("unused")
    @ReactProp(name = "refreshing")
    public void setRefreshing(SmartRefreshView view, Boolean refreshing) {
        if(!refreshing){
            view.finishRefresh();
        }
    }
}
