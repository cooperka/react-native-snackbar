package com.azendoo.reactnativesnackbar;

import android.support.design.widget.Snackbar;

import android.view.View;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

public class SnackbarModule extends ReactContextBaseJavaModule{

    private static final String REACT_NAME = "RNSnackbar";

    public SnackbarModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("LENGTH_LONG", Snackbar.LENGTH_LONG);
        constants.put("LENGTH_SHORT", Snackbar.LENGTH_SHORT);
        constants.put("LENGTH_INDEFINITE", Snackbar.LENGTH_INDEFINITE);

        return constants;
    }

    @ReactMethod
    public void show(ReadableMap options, Callback callback) {
        View view = getCurrentActivity().findViewById(android.R.id.content);

        if (view == null) return;

        String title = options.hasKey("title") ? options.getString("title") : "Hello";
        int duration = options.hasKey("duration") ? options.getInt("duration") : Snackbar.LENGTH_SHORT;

        Snackbar
                .make(view, title, duration)
                .show();
    }
}
