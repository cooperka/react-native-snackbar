import { NativeModules } from 'react-native';

export default {
  ...NativeModules.RNSnackbar,
  show: (options) => {
    NativeModules.RNSnackbar.show(options, options.action ? options.action.onPress : () => {});
  },
}
