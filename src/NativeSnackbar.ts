import type { CodegenTypes, TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type SnackbarConstants = {
  /**
   * Snackbar duration of about one second (varies per device).
   */
  LENGTH_SHORT: CodegenTypes.Int32;

  /**
   * Snackbar duration of about three seconds (varies per device).
   */
  LENGTH_LONG: CodegenTypes.Int32;

  /**
   * Snackbar duration that lasts forever (until dismissed, replaced, or action button is tapped).
   */
  LENGTH_INDEFINITE: CodegenTypes.Int32;

  /**
   * Indicates that the Snackbar was dismissed via a swipe.
   */
  DISMISS_EVENT_SWIPE: CodegenTypes.Int32;

  /**
   * Indicates that the Snackbar was dismissed via an action click.
   */
  DISMISS_EVENT_ACTION: CodegenTypes.Int32;

  /**
   * Indicates that the Snackbar was dismissed via a timeout.
   */
  DISMISS_EVENT_TIMEOUT: CodegenTypes.Int32;

  /**
   * Indicates that the Snackbar was dismissed via a call to {@link #dismiss()}.
   */
  DISMISS_EVENT_MANUAL: CodegenTypes.Int32;

  /**
   * Indicates that the Snackbar was dismissed from a new Snackbar being shown.
   */
  DISMISS_EVENT_CONSECUTIVE: CodegenTypes.Int32;

  /**
   * Indicates that Snackbar appears.
   */
  SHOW_EVENT: CodegenTypes.Int32;
};

/**
 * A Snackbar visibility event.
 */
export type SnackbarEvent = {
  /**
   * One of: Snackbar.DISMISS_EVENT_SWIPE, Snackbar.DISMISS_EVENT_ACTION,
   * Snackbar.DISMISS_EVENT_TIMEOUT, Snackbar.DISMISS_EVENT_MANUAL,
   * Snackbar.DISMISS_EVENT_CONSECUTIVE, Snackbar.SHOW_EVENT
   */
  event: CodegenTypes.Int32;
};

export interface Spec extends TurboModule {
  show(
    text: string,
    duration: CodegenTypes.Int32,
    numberOfLines: CodegenTypes.Int32,
    textAlignCenter: boolean,
    marginBottom: CodegenTypes.Int32,
    textColor: CodegenTypes.Int32,
    backgroundColor: CodegenTypes.Int32,
    fontFamily: string,
    rtl: boolean,
    action: boolean,
    actionText: string,
    actionTextColor: CodegenTypes.Int32,
    onPress: () => void
  ): void;
  dismiss(): void;
  getConstants(): SnackbarConstants;
  onSnackbarVisibility: CodegenTypes.EventEmitter<SnackbarEvent>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNSnackbar');
