import { TurboModuleRegistry } from 'react-native';
import type { Snackbar as SnackbarInstanceType } from '../index';

describe('Snackbar module', () => {
  let Snackbar: typeof SnackbarInstanceType;
  const RNSnackbarMock = {
    show: jest.fn(),
    dismiss: jest.fn(),
    getConstants: () => ({
      LENGTH_SHORT: 0,
      LENGTH_LONG: -1,
      LENGTH_INDEFINITE: -2,
      DISMISS_EVENT_SWIPE: 0,
      DISMISS_EVENT_ACTION: 1,
      DISMISS_EVENT_TIMEOUT: 2,
      DISMISS_EVENT_MANUAL: 3,
      DISMISS_EVENT_CONSECUTIVE: 4,
      SHOW_EVENT: 5,
    }),
  };

  beforeAll(() => {
    // @ts-expect-error Assigned type may not follow constraints.
    TurboModuleRegistry.getEnforcing = () => RNSnackbarMock;

    // Require Snackbar only after mocking TurboModuleRegistry.
    Snackbar = require('../index').Snackbar;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls native with default params', () => {
    Snackbar.show({ text: '' });

    expect(RNSnackbarMock.show.mock.calls).toMatchSnapshot();
  });

  it('calls native with normal params', () => {
    Snackbar.show({
      text: 'Hello world',
      duration: Snackbar.LENGTH_SHORT,
      textColor: 'blue',
      backgroundColor: 'red',
      action: {
        text: 'UNDO',
        textColor: 'green',
        onPress: jest.fn(),
      },
    });

    expect(RNSnackbarMock.show.mock.calls).toMatchSnapshot();
  });
});
