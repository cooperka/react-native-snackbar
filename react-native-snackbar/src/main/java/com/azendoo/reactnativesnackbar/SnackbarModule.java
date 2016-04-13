package com.azendoo.reactnativesnackbar;

import android.support.design.widget.Snackbar;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
    public void show() {
        // TODO: Check getCurrentActivity
        Snackbar.make(getCurrentActivity().getWindow().getDecorView().getRootView(), "Hello", Snackbar.LENGTH_SHORT).show();
    }
}
