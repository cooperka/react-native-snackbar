/**
 * An actionable button that can be shown on the Snackbar.
 */
export interface SnackbarAction {
  /**
   * Text for the button.
   */
  title: string;

  /**
   * Color of the text for the button.
   * Accepts various forms of colors such as hex, literals, rgba, etc.
   */
  color?: string | number;

  /**
   * Function called when the user presses the button.
   */
  onPress?(): void;
}

/**
 * List of options to configure the Snackbar.
 */
export interface SnackBarOptions {
  /**
   * The text that appears on the Snackbar.
   */
  title: string;

  /**
   * Color of the Snackbar title.
   * Accepts various forms of colors such as hex, literals, rgba, etc.
   */
  color?: string | number;

  /**
   * Length of time the Snackbar stays on screen.
   * Must be one of Snackbar.LENGTH_SHORT, Snackbar.LENGTH_LONG, or Snackbar.LENGTH_INDEFINITE.
   */
  duration?: number;

  /**
   * Background color of the snackbar
   * Accepts color strings such as hex, literals, rgba
   */
  backgroundColor?: string;

  /**
   * Adds an actionable button to the snackbar on the right
   */
  action?: SnackbarAction;
}

/**
 * Snackbar definition
 */
export interface SnackbarStatic {
  /**
   * Snackbar duration of about a second.
   */
  LENGTH_SHORT: number;

  /**
   * Snackbar duration of about three seconds.
   */
  LENGTH_LONG: number;

  /**
   * Snackbar duration that lasts forever (until a new Snackbar is shown).
   */
  LENGTH_INDEFINITE: number;

  /**
   * Shows a native Snackbar component.
   *
   * @param {SnackBarOptions} options
   */
  show(options: SnackBarOptions): void;

  /**
   * Dismisses any and all active Snackbars.
   */
  dismiss(): void;
}

declare const Snackbar: SnackbarStatic;
export default Snackbar;
