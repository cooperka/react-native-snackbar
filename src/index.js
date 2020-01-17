// @flow

import { NativeModules, processColor } from 'react-native';

/**
 * An optional, actionable button on the Snackbar.
 */
type Action = {
  /**
   * Button text.
   */
  title: string,

  /**
   * Button text color.
   * Accepts various forms of colors such as hex, literals, rgba, etc.
   */
  color?: string | number,

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
  title: string,

  /**
   * Length of time the Snackbar stays on screen.
   * Must be one of Snackbar.LENGTH_SHORT, Snackbar.LENGTH_LONG, or Snackbar.LENGTH_INDEFINITE.
   */
  duration?: number,

  /**
   * Snackbar text color.
   * Accepts various forms of colors such as hex, literals, rgba, etc.
   */
  color?: string | number,

  /**
   * Background color of the snackbar.
   * Accepts color strings such as hex, literals, rgba
   */
  backgroundColor?: string,

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
   * Snackbar duration that lasts forever (until dismissed or replaced).
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
    const action = options.action || {};
    const onPressCallback = action.onPress || (() => {});
    const actionColor = action.color && processColor(action.color);
    const backgroundColor = options.backgroundColor && processColor(options.backgroundColor);
    const color = options.color && processColor(options.color);

    const snackConfig = {
      ...options,
      action: options.action ? { ...action, color: actionColor } : undefined,
      backgroundColor,
      color,
    };

    NativeModules.RNSnackbar.show(snackConfig, onPressCallback);
  },

  dismiss() {
    NativeModules.RNSnackbar.dismiss();
  },
};

export default SnackBar;
