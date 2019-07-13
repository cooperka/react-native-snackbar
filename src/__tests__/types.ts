import Snackbar, { SnackBarOptions, SnackbarAction, SnackbarStatic } from '..';

/**
 * Duration Short, required properties only
 */
Snackbar.show({
  title: 'Hello world',
  duration: Snackbar.LENGTH_SHORT,
});

/**
 * Duration Long, Action with optional properties added
 */
Snackbar.show({
  title: 'Hello world',
  duration: Snackbar.LENGTH_LONG,
  backgroundColor: 'pink',
  color: 'red',
});

/**
 * Duration Indefinite, Action with required properties only
 */
Snackbar.show({
  title: 'Hello world',
  duration: Snackbar.LENGTH_INDEFINITE,
  action: {
    title: 'Undo',
  },
});

/**
 * Duration Indefinite, Action with custom properties added
 */
Snackbar.show({
  title: 'Hello world',
  duration: Snackbar.LENGTH_INDEFINITE,
  action: {
    title: 'Undo',
    color: 'red',
    onPress: () => {},
  },
});
