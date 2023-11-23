package com.azendoo.reactnativesnackbar;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.content.Context;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.snackbar.Snackbar;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SnackbarModule extends ReactContextBaseJavaModule {

    private static final String REACT_NAME = "RNSnackbar";


    private static final String ON_SNACKBAR_VISIBILITY_EVENT = "onSnackbarVisibility";
    private static final int SHOW_EVENT = 5;

    private final List<Snackbar> mActiveSnackbars = new ArrayList<>();

    public SnackbarModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
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
        constants.put("DISMISS_EVENT_SWIPE", Snackbar.Callback.DISMISS_EVENT_SWIPE);
        constants.put("DISMISS_EVENT_ACTION", Snackbar.Callback.DISMISS_EVENT_ACTION);
        constants.put("DISMISS_EVENT_TIMEOUT", Snackbar.Callback.DISMISS_EVENT_TIMEOUT);
        constants.put("DISMISS_EVENT_MANUAL", Snackbar.Callback.DISMISS_EVENT_MANUAL);
        constants.put("DISMISS_EVENT_CONSECUTIVE", Snackbar.Callback.DISMISS_EVENT_CONSECUTIVE);
        constants.put("SHOW_EVENT", SHOW_EVENT);

        return constants;
    }

    @ReactMethod
    public void show(ReadableMap options, final Callback callback) {
        ViewGroup view;

        try {
            view = (ViewGroup) getCurrentActivity().getWindow().getDecorView().findViewById(android.R.id.content);
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        if (view == null) return;

        mActiveSnackbars.clear();

        // `hasWindowFocus`: Returns true if this activity's *main* window currently has window focus.
        // Note that this is not the same as the view itself having focus.
        if (!view.hasWindowFocus()) {
            // Get all modal views on the screen.
            ArrayList<View> modals = recursiveLoopChildren(view, new ArrayList<View>());

            // Reverse array in order to get first the last modal rendered.
            Collections.reverse(modals);

            for (View modal : modals) {
                if (modal == null) continue;

                displaySnackbar(modal, options, callback);
                return;
            }

            // No valid modals.
            if (view.getVisibility() == View.VISIBLE) {
                displaySnackbar(view, options, callback);
            } else {
                Log.w(REACT_NAME, "Content view is not in focus or not visible");
            }

            return;
        }

        displaySnackbar(view, options, callback);
    }

    @ReactMethod
    public void dismiss() {
        for (Snackbar snackbar : mActiveSnackbars) {
            if (snackbar != null) {
                snackbar.dismiss();
            }
        }

        mActiveSnackbars.clear();
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    private void displaySnackbar(View view, ReadableMap options, final Callback callback) {
        String text = getOptionValue(options, "text", "");
        int duration = getOptionValue(options, "duration", Snackbar.LENGTH_SHORT);
        int numberOfLines = getOptionValue(options, "numberOfLines", 2);
        int textColor = getOptionValue(options, "textColor", Color.WHITE);
        boolean textAlignCenter = getOptionValue(options, "textAlignCenter", false);
        boolean rtl = getOptionValue(options, "rtl", false);
        int marginBottom = getOptionValue(options, "marginBottom", 0);
        String fontFamily = getOptionValue(options, "fontFamily", null);
        Typeface font = null;
        if (fontFamily != null) {
            try {
                font = Typeface.createFromAsset(view.getContext().getAssets(), "fonts/" + fontFamily + ".ttf");
            } catch (Exception e) {
                e.printStackTrace();
                throw new Error("Failed to load font " + fontFamily + ".ttf, did you include it in your assets?");
            }
        }

        Snackbar snackbar;
        try {
            snackbar = Snackbar.make(view, text, duration);
        } catch (IllegalArgumentException e) {
            // TODO: Fix root cause of "No suitable parent found from the given view. Please provide a valid view."
            e.printStackTrace();
            return;
        }

        snackbar.setAnimationMode(marginBottom == 0
                ? BaseTransientBottomBar.ANIMATION_MODE_SLIDE
                : BaseTransientBottomBar.ANIMATION_MODE_FADE
        );

        View snackbarView = snackbar.getView();

        if (rtl && Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            snackbarView.setLayoutDirection(View.LAYOUT_DIRECTION_RTL);
            snackbarView.setTextDirection(View.TEXT_DIRECTION_RTL);
        }

        if (marginBottom != 0) {
            snackbarView.setTranslationY(-(convertDpToPixel(marginBottom, snackbarView.getContext())));
        }

        TextView snackbarText = snackbarView.findViewById(com.google.android.material.R.id.snackbar_text);
        snackbarText.setMaxLines(numberOfLines);
        snackbarText.setTextColor(textColor);
        if (textAlignCenter) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
                snackbarText.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
            } else {
                snackbarText.setGravity(Gravity.CENTER_HORIZONTAL);
            }
        } else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
                snackbarText.setTextAlignment(View.TEXT_ALIGNMENT_TEXT_START);
            } else {
                snackbarText.setGravity(Gravity.START);
            }
        }

        if (font != null) {
            snackbarText.setTypeface(font);
        }

        mActiveSnackbars.add(snackbar);

        if (options.hasKey("backgroundColor")) {
            snackbarView.setBackgroundColor(options.getInt("backgroundColor"));
        }

        if (options.hasKey("action")) {
            ReadableMap actionOptions = options.getMap("action");
            String actionText = getOptionValue(actionOptions, "text", "");
            int actionTextColor = getOptionValue(actionOptions, "textColor", Color.WHITE);

            View.OnClickListener onClickListener = new View.OnClickListener() {
                // Prevent double-taps which can lead to a crash.
                boolean callbackWasCalled = false;

                @Override
                public void onClick(View v) {
                    if (callbackWasCalled) return;
                    callbackWasCalled = true;

                    callback.invoke();
                }
            };

            snackbar.setAction(actionText, onClickListener);
            snackbar.setActionTextColor(actionTextColor);

            if (font != null) {
                TextView snackbarActionText = snackbarView.findViewById(com.google.android.material.R.id.snackbar_action);
                snackbarActionText.setTypeface(font);
            }
        }

        snackbar.addCallback(new BaseTransientBottomBar.BaseCallback<Snackbar>() {
            @Override
            public void onDismissed(Snackbar transientBottomBar, int event) {
                sendSnackbarVisibilityEvent(event);
            }

            @Override
            public void onShown(Snackbar transientBottomBar) {
                sendSnackbarVisibilityEvent(SHOW_EVENT);
            }
        });

        snackbar.show();
    }

    public static float convertDpToPixel(float dp, Context context){
        return dp * ((float) context.getResources().getDisplayMetrics().densityDpi / DisplayMetrics.DENSITY_DEFAULT);
    }

    /**
     * Loop through all child modals and save references to them.
     */
    private ArrayList<View> recursiveLoopChildren(ViewGroup view, ArrayList<View> modals) {
        if (view.getClass().getSimpleName().equalsIgnoreCase("ReactModalHostView")) {
            modals.add(view.getChildAt(0));
        }

        for (int i = view.getChildCount() - 1; i >= 0; i--) {
            final View child = view.getChildAt(i);

            if (child instanceof ViewGroup) {
                recursiveLoopChildren((ViewGroup) child, modals);
            }
        }

        return modals;
    }

    private void sendSnackbarVisibilityEvent(int event) {
        WritableMap params = Arguments.createMap();
        params.putInt("event", event);
        sendEvent(getReactApplicationContext(), ON_SNACKBAR_VISIBILITY_EVENT, params);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private String getOptionValue(ReadableMap options, String key, String fallback) {
        return options.hasKey(key) ? options.getString(key) : fallback;
    }

    private int getOptionValue(ReadableMap options, String key, int fallback) {
        return options.hasKey(key) ? options.getInt(key) : fallback;
    }

    private boolean getOptionValue(ReadableMap options, String key, boolean fallback) {
        return options.hasKey(key) ? options.getBoolean(key) : fallback;
    }

}
