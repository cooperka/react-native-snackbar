package com.azendoo.reactnativesnackbar;

import android.graphics.Color;
import android.os.Build;
import android.support.design.widget.Snackbar;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SnackbarModule extends ReactContextBaseJavaModule{

    private static final String REACT_NAME = "RNSnackbar";

    // Store all modals in the screen.
    private ArrayList<View> modals = new ArrayList<>();

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
    public void show(ReadableMap options, final Callback callback) {
        ViewGroup view = (ViewGroup) getCurrentActivity().getWindow().getDecorView().findViewById(android.R.id.content);

        if (view == null) return;

        if (!view.hasWindowFocus()) {
            // The view is not focused, we should get all the modal views in the screen.
            recursiveLoopChildren(view);

            for(View modalViews : modals) {
                displaySnackbar(modalViews, options, callback);
            }

            return;
        }

        displaySnackbar(view, options, callback);
    }

    private void displaySnackbar(View view, ReadableMap options, final Callback callback) {
        String title = options.hasKey("title") ? options.getString("title") : "Hello";
        int duration = options.hasKey("duration") ? options.getInt("duration") : Snackbar.LENGTH_SHORT;

        Snackbar snackbar = Snackbar.make(view, title, duration);

        // Set the background color.
        if (options.hasKey("backgroundColor")) {
            snackbar.getView().setBackgroundColor(options.getInt("backgroundColor"));
        }

        if (options.hasKey("action")) {
            View.OnClickListener onClickListener = new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    callback.invoke();
                }
            };

            ReadableMap actionDetails = options.getMap("action");
            snackbar.setAction(actionDetails.getString("title"), onClickListener);
            snackbar.setActionTextColor(actionDetails.getInt("color"));
        }

        // For older devices, explicitly set the text color; otherwise it may appear dark gray.
        // http://stackoverflow.com/a/31084530/763231
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            View snackbarView = snackbar.getView();
            TextView snackbarText = (TextView) snackbarView.findViewById(android.support.design.R.id.snackbar_text);
            snackbarText.setTextColor(Color.WHITE);
        }

        snackbar.show();
    }

    private void recursiveLoopChildren(ViewGroup view) {
        // Get all the modal views.
        if (view.getClass().getSimpleName().equalsIgnoreCase("ReactModalHostView")) {
            modals.add(view.getChildAt(0));
        }

        for (int i = view.getChildCount() - 1; i >= 0; i--) {
            final View child = view.getChildAt(i);

            if (child instanceof ViewGroup) {
                recursiveLoopChildren((ViewGroup) child);
            }
        }
    }
}
