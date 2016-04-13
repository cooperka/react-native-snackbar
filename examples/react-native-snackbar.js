import { NativeModules } from 'react-native';

import processColor from 'processColor';

export default {
  ...NativeModules.RNSnackbar,
  show: (options) => {
    const action = options.action ? options.action.onPress : null;

    if (options.action && options.action.color) {
      options.action.color = processColor(options.action.color);
    }
    NativeModules.RNSnackbar.show(options, action);
  },
}
