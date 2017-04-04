// Type definitions for react-native-snackbar 0.3.2
// Project: https://github.com/cooperka/react-native-snackbar
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.2.2


/**
 * Actionable button to the snackbar on right.
 * 
 * @interface Action
 */
interface Action {
  /**
   * Text for the button
   */
  title: string

  /**
   * Color of the text for the button
   * Accepts color strings such as hex, literals, rgba
   */
  color: string

  /**
   * Function called when user presses the button
   */
  onPress(): void
}


/**
 * List of options to make a snackbar
 * 
 * @interface SnackBarOptions
 */
interface SnackBarOptions {
   /**
   * The text that appears on the snackbar.
   * This property is required
   */
  title: string

  /**
   * Length of time the snackbar stays on screen
   * It takes either OF three values. Snackbar.LENGTH_SHORT, Snackbar.LENGTH_LONG, Snackbar.LENGTH_INDEFINITE
   * This property is required
   */
  duration: any

  /**
   * Background color of the snackbar
   * Accepts color strings such as hex, literals, rgba
   */
  backgroundColor?: string

  /**
   * Adds an actionable button to the snackbar on the right
   */
  action?: Action
}

/**
 * Snackbar duration of 2000ms (2 seconds)
 */
export const LENGTH_SHORT: number

/**
 * Snackbar duration of 3 seconds
 */
export const LENGTH_LONG: number

/**
 * Snackbar duration that lasts forever
 */
export const LENGTH_INDEFINITE: number


/**
 * Shows a snackbar defined by a set of options
 * 
 * @param {SnackBarOptions} options 
 */
export function show(options: SnackBarOptions): void
