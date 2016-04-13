package com.examples;

import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.view.View;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

public class SnackbarModule extends ReactContextBaseJavaModule {

    private static final String REACT_NAME = "RNSnackbar";

    public SnackbarModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_NAME;
    }

    @ReactMethod
    public void show(ReadableMap options, @Nullable final Callback callback) {
        // TODO: Check getCurrentActivity
        Snackbar snackbar = Snackbar.make(getCurrentActivity().findViewById(android.R.id.content), options.getString("title"), options.getInt("duration"));

        if (callback != null) { // There is an action
            snackbar.setAction("Hello", new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    callback.invoke();
                }
            });
        }
        snackbar.show();
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();

        constants.put("LENGTH_INDEFINITE", Snackbar.LENGTH_INDEFINITE);
        constants.put("LENGTH_LONG", Snackbar.LENGTH_LONG);
        constants.put("LENGTH_SHORT", Snackbar.LENGTH_SHORT);
        return constants;
    }
}
