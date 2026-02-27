module.exports = {
  Snackbar: {
    show: jest.fn(),
    onSnackbarVisibility: () => ({ remove: jest.fn() }),
  },
};
