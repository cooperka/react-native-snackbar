import { render } from '@testing-library/react-native';

import App from '../App';

describe('Snackbar example app', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
