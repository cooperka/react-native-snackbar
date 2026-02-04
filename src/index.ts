import type { ColorValue } from 'react-native';
import { processColor } from 'react-native';
import NativeSnackbar, { type SnackbarEvent } from './NativeSnackbar';

export type { SnackbarEvent } from './NativeSnackbar';

/**
 * An optional, actionable button on the Snackbar.
 */
export interface SnackbarAction {
  /**
   * Button text.
   */
  text: string;

  /**
   * Button text color.
   * Accepts various forms of colors such as hex, literals, rgba, etc.
   */
  textColor?: ColorValue;

  /**
   * Function called when the user taps the button.
   */
  onPress?(): void;
}

/**
 * Snackbar configuration options.
 */
export interface SnackBarOptions {
  /**
   * Snackbar text.
   */
  text: string;

  /**
   * Number of text lines to display on the snackbar.
   * Default 2 lines are shown.
   */
  numberOfLines?: number;

  /**
   * Align text center
   */
  textAlignCenter?: boolean;

  /**
   * Length of time the Snackbar stays on screen.
   * One of Snackbar.LENGTH_SHORT, Snackbar.LENGTH_LONG, Snackbar.LENGTH_INDEFINITE, or
   * a custom length in milliseconds.
   */
  duration?: number;

  /**
   * Margin from bottom, defaults to 0.
   */
  marginBottom?: number;

  /**
   * Snackbar text color.
   * Accepts various forms of colors such as hex, literals, rgba, etc.
   */
  textColor?: ColorValue;

  /**
   * Background color of the snackbar.
   * Accepts color strings such as hex, literals, rgba
   */
  backgroundColor?: ColorValue;

  /**
   * [Android] The basename of a .ttf font from assets/fonts/.
   */
  fontFamily?: string;

  /**
   * Action button configuration options.
   */
  action?: SnackbarAction;

  /**
   * Rtl the snackbar
   *
   * [Android only, API 17+] Whether the Snackbar should render right-to-left
   * @requires `android:supportsRtl="true"`
   * @see https://android-developers.googleblog.com/2013/03/native-rtl-support-in-android-42.html
   * @see https://github.com/MortezaHeydari97/react-native-snackbar/blob/main/example
   */
  rtl?: boolean;
}

function processColorOrThrow(color?: ColorValue) {
  if (color == null) {
    return -1;
  }
  const processed = processColor(color);
  if (typeof processed === 'number') {
    return processed;
  }
  throw new Error(`Failed to parse color '${String(color)}'`);
}

const constants = NativeSnackbar.getConstants();

export const Snackbar = {
  /**
   * Snackbar duration of about one second (varies per device).
   */
  LENGTH_SHORT: constants.LENGTH_SHORT,

  /**
   * Snackbar duration of about three seconds (varies per device).
   */
  LENGTH_LONG: constants.LENGTH_LONG,

  /**
   * Snackbar duration that lasts forever (until dismissed, replaced, or action button is tapped).
   */
  LENGTH_INDEFINITE: constants.LENGTH_INDEFINITE,

  /**
   * Indicates that the Snackbar was dismissed via a swipe.
   */
  DISMISS_EVENT_SWIPE: constants.DISMISS_EVENT_SWIPE,

  /**
   * Indicates that the Snackbar was dismissed via an action click.
   */
  DISMISS_EVENT_ACTION: constants.DISMISS_EVENT_ACTION,

  /**
   * Indicates that the Snackbar was dismissed via a timeout.
   */
  DISMISS_EVENT_TIMEOUT: constants.DISMISS_EVENT_TIMEOUT,

  /**
   * Indicates that the Snackbar was dismissed via a call to {@link #dismiss()}.
   */
  DISMISS_EVENT_MANUAL: constants.DISMISS_EVENT_MANUAL,

  /**
   * Indicates that the Snackbar was dismissed from a new Snackbar being shown.
   */
  DISMISS_EVENT_CONSECUTIVE: constants.DISMISS_EVENT_CONSECUTIVE,

  /**
   * Indicates that Snackbar appears.
   */
  SHOW_EVENT: constants.SHOW_EVENT,

  /**
   * Shows a native Snackbar component.
   */
  show(options: SnackBarOptions) {
    NativeSnackbar.show(
      options.text,
      options.duration ?? Snackbar.LENGTH_SHORT,
      options.numberOfLines ?? 2,
      options.textAlignCenter ?? false,
      options.marginBottom ?? 0,
      processColorOrThrow(options.textColor ?? 'white'),
      processColorOrThrow(options.backgroundColor),
      options.fontFamily ?? '',
      options.rtl ?? false,
      options.action != null,
      options.action?.text ?? '',
      processColorOrThrow(options.action?.textColor ?? 'white'),
      options.action?.onPress ?? (() => {})
    );
  },

  /**
   * Dismisses any and all active Snackbars.
   */
  dismiss() {
    NativeSnackbar.dismiss();
  },

  /**
   * Observe Snackbar visibility changes.
   */
  onSnackbarVisibility(handler: (event: SnackbarEvent) => void) {
    return NativeSnackbar.onSnackbarVisibility(handler);
  },
};
