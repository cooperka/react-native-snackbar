import { NativeModules } from 'react-native';

import Snackbar from '../index';

jest.mock('NativeModules', () => ({
  RNSnackbar: {
    show: jest.fn(),
  },
}));

describe('Snackbar module', () => {
  beforeEach(() => {
    NativeModules.RNSnackbar.show.mockClear();
  });

  it('calls native with default params', () => {
    Snackbar.show({});

    expect(NativeModules.RNSnackbar.show.mock.calls).toMatchSnapshot();
  });

  it('calls native with specified params', () => {
    Snackbar.show({
      title: 'Hello world',
      action: {
        title: 'UNDO',
        color: 'green',
        onPress: jest.fn(),
      },
      duration: 0,
    });

    expect(NativeModules.RNSnackbar.show.mock.calls).toMatchSnapshot();
  });
});
