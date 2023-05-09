import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock(
  '../../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter',
);

describe('Snackbar example app', () => {
  it('renders without crashing', () => {
    renderer.create(<App />);
  });
});
