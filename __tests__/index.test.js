import { NativeModules } from 'react-native';

describe('Snackbar module', () => {
  let Snackbar;

  beforeAll(() => {
    NativeModules.RNSnackbar = {
      show: jest.fn(),
    };

    // Require Snackbar only after NativeModules have been mocked.
    // eslint-disable-next-line global-require
    Snackbar = require('../index').default;
  });

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
