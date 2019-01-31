// @flow

import { NativeModules, processColor } from 'react-native';

type Action = {
  title: string,
  color?: string | number,
  onPress?: () => void,
};

type SnackBarOptions = {
  title: string,
  duration?: number,
  color?: string | number,
  backgroundColor?: string,
  action?: Action,
};

type ISnackBar = {
  LENGTH_LONG: number,
  LENGTH_SHORT: number,
  LENGTH_INDEFINITE: number,
  show: (options: SnackBarOptions) => void,
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
