import { NativeModules, processColor } from 'react-native';

export default {

  LENGTH_LONG: NativeModules.RNSnackbar.LENGTH_LONG,
  LENGTH_SHORT: NativeModules.RNSnackbar.LENGTH_SHORT,
  LENGTH_INDEFINITE: NativeModules.RNSnackbar.LENGTH_INDEFINITE,

  show: (options) => {
    const action = options.action ? options.action.onPress : () => {};

    if (options.action && options.action.color) {
      // eslint-disable-next-line no-param-reassign
      options.action.color = processColor(options.action.color);
    }

    if (options.backgroundColor) {
      // eslint-disable-next-line no-param-reassign
      options.backgroundColor = processColor(options.backgroundColor);
    }

    NativeModules.RNSnackbar.show(options, action);
  },

};
