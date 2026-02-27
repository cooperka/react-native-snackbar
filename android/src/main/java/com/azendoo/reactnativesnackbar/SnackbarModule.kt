package com.azendoo.reactnativesnackbar

import android.content.Context
import android.graphics.Typeface
import android.util.DisplayMetrics
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.view.isVisible
import androidx.core.view.size
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.google.android.material.R
import com.google.android.material.snackbar.BaseTransientBottomBar
import com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback
import com.google.android.material.snackbar.Snackbar
import kotlin.math.roundToInt


class SnackbarModule(reactContext: ReactApplicationContext) :
  NativeSnackbarSpec(reactContext) {

  private val mActiveSnackbars = mutableListOf<Snackbar>()

  override fun show(
    text: String,
    duration: Double,
    numberOfLines: Double,
    textAlignCenter: Boolean,
    marginBottom: Double,
    textColor: Double,
    backgroundColor: Double,
    fontFamily: String,
    rtl: Boolean,
    action: Boolean,
    actionText: String,
    actionTextColor: Double,
    onPress: Callback?
  ) {
    val view =
      reactApplicationContext.currentActivity?.window?.decorView?.findViewById<ViewGroup>(android.R.id.content)
        ?: return
    mActiveSnackbars.clear()

    var targetView: View = view

    // `hasWindowFocus`: Returns true if this activity's *main* window currently has window focus.
    // Note that this is not the same as the view itself having focus.
    if (!view.hasWindowFocus()) {
      // Get all modal views on the screen.
      val modals = recursiveLoopChildren(view, mutableListOf())
      if (modals.isNotEmpty()) {
        // Select the last modal rendered.
        targetView = modals.last()
      } else if (!view.isVisible) {
        // No valid modals.
        Log.w(NAME, "Content view is not in focus or not visible")
        return
      }
    }

    displaySnackbar(
      targetView,
      text,
      duration.roundToInt(),
      numberOfLines.roundToInt(),
      textAlignCenter,
      marginBottom.roundToInt(),
      textColor.roundToInt(),
      backgroundColor.roundToInt(),
      fontFamily,
      rtl,
      action,
      actionText,
      actionTextColor.roundToInt(),
      onPress
    )
  }

  override fun dismiss() {
    for (snackbar in mActiveSnackbars) {
      snackbar.dismiss()
    }
    mActiveSnackbars.clear()
  }

  override fun getTypedExportedConstants() = mapOf(
    "LENGTH_SHORT" to Snackbar.LENGTH_SHORT,
    "LENGTH_LONG" to Snackbar.LENGTH_LONG,
    "LENGTH_INDEFINITE" to Snackbar.LENGTH_INDEFINITE,
    "DISMISS_EVENT_SWIPE" to Snackbar.Callback.DISMISS_EVENT_SWIPE,
    "DISMISS_EVENT_ACTION" to Snackbar.Callback.DISMISS_EVENT_ACTION,
    "DISMISS_EVENT_TIMEOUT" to Snackbar.Callback.DISMISS_EVENT_TIMEOUT,
    "DISMISS_EVENT_MANUAL" to Snackbar.Callback.DISMISS_EVENT_MANUAL,
    "DISMISS_EVENT_CONSECUTIVE" to Snackbar.Callback.DISMISS_EVENT_CONSECUTIVE,
    "SHOW_EVENT" to SHOW_EVENT
  )

  private fun displaySnackbar(
    view: View,
    text: String,
    duration: Int,
    numberOfLines: Int,
    textAlignCenter: Boolean,
    marginBottom: Int,
    textColor: Int,
    backgroundColor: Int,
    fontFamily: String,
    rtl: Boolean,
    action: Boolean,
    actionText: String,
    actionTextColor: Int,
    onPress: Callback?
  ) {
    val font = if (fontFamily.isEmpty()) {
      null
    } else {
      try {
        Typeface.createFromAsset(view.context.assets, "fonts/$fontFamily.ttf")
      } catch (e: Exception) {
        e.printStackTrace()
        throw Error("Failed to load font $fontFamily.ttf, did you include it in your assets?")
      }
    }

    val snackbar: Snackbar
    try {
      snackbar = Snackbar.make(view, text, duration)
    } catch (e: IllegalArgumentException) {
      // TODO: Fix root cause of "No suitable parent found from the given view. Please provide a valid view."
      e.printStackTrace()
      return
    }

    snackbar.setAnimationMode(
      if (marginBottom == 0)
        BaseTransientBottomBar.ANIMATION_MODE_SLIDE
      else
        BaseTransientBottomBar.ANIMATION_MODE_FADE
    )

    val snackbarView = snackbar.getView()

    if (rtl) {
      snackbarView.layoutDirection = View.LAYOUT_DIRECTION_RTL
      snackbarView.textDirection = View.TEXT_DIRECTION_RTL
    }

    if (marginBottom != 0) {
      snackbarView.translationY = -(convertDpToPixel(marginBottom, snackbarView.context))
    }

    val snackbarText = snackbarView.findViewById<TextView>(R.id.snackbar_text)
    snackbarText.maxLines = numberOfLines
    snackbarText.setTextColor(textColor)
    if (textAlignCenter) {
      snackbarText.textAlignment = View.TEXT_ALIGNMENT_CENTER
    } else {
      snackbarText.textAlignment = View.TEXT_ALIGNMENT_TEXT_START
    }

    if (font != null) {
      snackbarText.setTypeface(font)
    }

    mActiveSnackbars.add(snackbar)

    if (backgroundColor != -1) {
      snackbarView.setBackgroundColor(backgroundColor)
    }

    if (action) {
      val onClickListener: View.OnClickListener = object : View.OnClickListener {
        // Prevent double-taps which can lead to a crash.
        var callbackWasCalled: Boolean = false

        override fun onClick(v: View?) {
          if (callbackWasCalled) return
          callbackWasCalled = true

          onPress?.invoke()
        }
      }

      snackbar.setAction(actionText, onClickListener)
      snackbar.setActionTextColor(actionTextColor)

      if (font != null) {
        val snackbarActionText = snackbarView.findViewById<TextView>(R.id.snackbar_action)
        snackbarActionText.setTypeface(font)
      }
    }

    snackbar.addCallback(object : BaseCallback<Snackbar>() {
      override fun onDismissed(transientBottomBar: Snackbar, event: Int) {
        sendSnackbarVisibilityEvent(event)
      }

      override fun onShown(transientBottomBar: Snackbar) {
        sendSnackbarVisibilityEvent(SHOW_EVENT)
      }
    })

    snackbar.show()
  }

  private fun convertDpToPixel(dp: Int, context: Context) =
    dp * (context.resources.displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)


  /**
   * Loop through all child modals and save references to them.
   */
  private fun recursiveLoopChildren(view: ViewGroup, modals: MutableList<View>): MutableList<View> {
    if (view.javaClass.simpleName.equals("ReactModalHostView", ignoreCase = true)) {
      view.getChildAt(0)?.let { modals.add(it) }
    }

    for (i in view.size - 1 downTo 0) {
      val child = view.getChildAt(i)

      if (child is ViewGroup) {
        recursiveLoopChildren(child, modals)
      }
    }

    return modals
  }

  private fun sendSnackbarVisibilityEvent(event: Int) {
    emitOnSnackbarVisibility(Arguments.createMap().apply { putInt("event", event) })
  }

  companion object {
    const val NAME = NativeSnackbarSpec.NAME
    const val SHOW_EVENT = 5
  }
}
