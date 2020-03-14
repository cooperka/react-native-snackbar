import { SNACKBARTYPE_DANGER } from '../theme/theme';
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

    //INFO: #TEST 1
    it('#1-check full setting with theme', () => {
        Snackbar.show({
            text: 'Hello world',
            duration: 0,
            ...SNACKBARTYPE_DANGER,
            action: {
                text: 'UNDO',
                textColor: 'green',
                onPress: jest.fn(),
            },
        });
        expect(NativeModules.RNSnackbar.show.mock.calls).toMatchSnapshot();
    });

});