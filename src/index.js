// @flow

import { NativeModules, processColor } from 'react-native';

/**
 * An optional, actionable button on the Snackbar.
 */
type Action = {
  /**
   * Button text.
   */
  text: string,

  /**
   * Button text color.
   * Accepts various forms of colors such as hex, literals, rgba, etc.
   */
  textColor?: string | number,

  /**
   * Function called when the user taps the button.
   */
  onPress?: () => void,
};

/**
 * Snackbar configuration options.
 */
type SnackBarOptions = {
  /**
   * Snackbar text.
   */
  text: string,

  /**
   * Number of text lines to display on the snackbar.
   * Default 2 lines are shown.
   */
  numberOfLines?: number,

  /**
   * Length of time the Snackbar stays on screen.
   * Must be one of Snackbar.LENGTH_SHORT, Snackbar.LENGTH_LONG, or Snackbar.LENGTH_INDEFINITE.
   */
  duration?: number,

  /**
   * Margin from bottom, defaults to 0.
   */
  marginBottom?: number,

  /**
   * Snackbar text color.
   * Accepts various forms of colors such as hex, literals, rgba, etc.
   */
  textColor?: string | number,

  /**
   * Background color of the snackbar.
   * Accepts color strings such as hex, literals, rgba
   */
  backgroundColor?: string,

  /**
   * [Android] The basename of a .ttf font from assets/fonts/.
   */
  fontFamily?: string,

  /**
   * Action button configuration options.
   */
  action?: Action,
};

/**
 * Static Snackbar attributes.
 */
type ISnackBar = {
  /**
   * Snackbar duration of about one second (varies per device).
   */
  LENGTH_SHORT: number,

  /**
   * Snackbar duration of about three seconds (varies per device).
   */
  LENGTH_LONG: number,

  /**
   * Snackbar duration that lasts forever (until dismissed, replaced, or action button is tapped).
   */
  LENGTH_INDEFINITE: number,

  /**
   * Shows a native Snackbar component.
   */
  show: (options: SnackBarOptions) => void,

  /**
   * Dismisses any and all active Snackbars.
   */
  dismiss: () => void,
};

const SnackBar: ISnackBar = {
  LENGTH_LONG: NativeModules.RNSnackbar.LENGTH_LONG,
  LENGTH_SHORT: NativeModules.RNSnackbar.LENGTH_SHORT,
  LENGTH_INDEFINITE: NativeModules.RNSnackbar.LENGTH_INDEFINITE,

  show(options: SnackBarOptions) {
    warnDeprecation(options, 'title', 'text');
    warnDeprecation(options, 'color', 'textColor');

    const text = options.text || options.title;
    const { numberOfLines } = options;
    // eslint-disable-next-line no-param-reassign
    delete options.title;
    const textColorRaw = options.textColor || options.color;
    // eslint-disable-next-line no-param-reassign
    delete options.color;
    const textColor = textColorRaw && processColor(textColorRaw);
    const backgroundColor = options.backgroundColor && processColor(options.backgroundColor);

    const action = options.action || {};

    warnDeprecation(action, 'title', 'text');
    warnDeprecation(action, 'color', 'textColor');

    const actionText = action.text || action.title;
    delete action.title;
    const actionTextColorRaw = action.textColor || action.color;
    delete action.color;
    const actionTextColor = actionTextColorRaw && processColor(actionTextColorRaw);
    const onPressCallback = action.onPress || (() => {});

    const nativeOptions = {
      ...options,
      text,
      textColor,
      numberOfLines,
      backgroundColor,
      action: options.action ? {
        ...action,
        text: actionText,
        textColor: actionTextColor,
      } : undefined,
    };

    NativeModules.RNSnackbar.show(nativeOptions, onPressCallback);
  },

  dismiss() {
    NativeModules.RNSnackbar.dismiss();
  },
};

function warnDeprecation(options, deprecatedKey, newKey) {
  if (options && options[deprecatedKey]) {
    console.warn(`The Snackbar '${deprecatedKey}' option has been deprecated. Please switch to '${newKey}' instead.`);
  }
}

export default SnackBar;
