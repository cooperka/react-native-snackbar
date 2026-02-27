/**
 * @format
 */
/* global jest */

const RNSnackbar = {
  LENGTH_SHORT: 5,
  LENGTH_LONG: 10,
  LENGTH_INDEFINITIE: -1,
  show: jest.fn(),
  dismiss: jest.fn(),
};

module.exports = RNSnackbar;
