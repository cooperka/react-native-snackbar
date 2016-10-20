package com.azendoo.reactnativesnackbar;

import android.support.design.widget.Snackbar;

import android.view.View;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class SnackbarModule extends ReactContextBaseJavaModule{

    private static final String REACT_NAME = "RNSnackbar";

    public SnackbarModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_NAME;
    }

    @ReactMethod
    public void show(ReadableMap options, Callback callback) {
        View view = getCurrentActivity().findViewById(android.R.id.content);

        if (view == null) return;

        // TODO: Set length properly https://developer.android.com/reference/android/support/design/widget/Snackbar.html
        String title = options.hasKey("title") ? options.getString("title") : "Hello";
        int duration = options.hasKey("duration") ? options.getInt("duration") : Snackbar.LENGTH_SHORT;

        Snackbar
                .make(view, title, duration)
                .show();
    }
}
