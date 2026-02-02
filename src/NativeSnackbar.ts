import type { CodegenTypes, TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type SnackbarConstants = {
  /**
   * Snackbar duration of about one second (varies per device).
   */
  LENGTH_SHORT: number;

  /**
   * Snackbar duration of about three seconds (varies per device).
   */
  LENGTH_LONG: number;

  /**
   * Snackbar duration that lasts forever (until dismissed, replaced, or action button is tapped).
   */
  LENGTH_INDEFINITE: number;

  /**
   * Indicates that the Snackbar was dismissed via a swipe.
   */
  DISMISS_EVENT_SWIPE: number;

  /**
   * Indicates that the Snackbar was dismissed via an action click.
   */
  DISMISS_EVENT_ACTION: number;

  /**
   * Indicates that the Snackbar was dismissed via a timeout.
   */
  DISMISS_EVENT_TIMEOUT: number;

  /**
   * Indicates that the Snackbar was dismissed via a call to {@link #dismiss()}.
   */
  DISMISS_EVENT_MANUAL: number;

  /**
   * Indicates that the Snackbar was dismissed from a new Snackbar being shown.
   */
  DISMISS_EVENT_CONSECUTIVE: number;

  /**
   * Indicates that Snackbar appears.
   */
  SHOW_EVENT: number;
};

// type NullableProcessedColor = ProcessedColorValue | null | undefined;

/**
 * A Snackbar visibility event.
 */
export type SnackbarEvent = {
  /**
   * One of: Snackbar.DISMISS_EVENT_SWIPE, Snackbar.DISMISS_EVENT_ACTION,
   * Snackbar.DISMISS_EVENT_TIMEOUT, Snackbar.DISMISS_EVENT_MANUAL,
   * Snackbar.DISMISS_EVENT_CONSECUTIVE, Snackbar.SHOW_EVENT
   */
  event: number;
};

export interface Spec extends TurboModule {
  show(
    text: string,
    duration: number,
    numberOfLines: number,
    textAlignCenter: boolean,
    marginBottom: number,
    textColor: number,
    backgroundColor: number,
    fontFamily: string,
    rtl: boolean,
    action: boolean,
    actionText: string,
    actionTextColor: number,
    onPress: undefined | (() => void)
  ): void;
  dismiss(): void;
  getConstants(): SnackbarConstants;
  onSnackbarVisibility: CodegenTypes.EventEmitter<SnackbarEvent>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNSnackbar');
