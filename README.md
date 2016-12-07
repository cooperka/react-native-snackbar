# react-native-snackbar

Implementation of the material design Snackbar component for both Android and iOS.
See [Google Design](https://material.google.com/components/snackbars-toasts.html) for more info.

## Installation

To use this extension, you have to do the following steps:

1. In your react-native project, run

    - using npm:

        ```shell
        npm install react-native-snackbar
        ```

    - using yarn:

        ```shell
        yarn add react-native-snackbar
        ```

2. Link the library using `react-native link react-native-snackbar`
(learn more about [linking](https://facebook.github.io/react-native/docs/linking-libraries-ios.html).

3. Import it in your JS where you want to show a snackbar:

    ```js
    import Snackbar from 'react-native-snackbar';
    ```

## Usage

To show a simple snackbar:

```js
Snackbar.show({
    title: 'Hello world',

    // Optional duration. Can be one of LENGTH_LONG | LENGTH_SHORT | LENGTH_INDEFINITE.
    duration: Snackbar.LENGTH_LONG,
});
```

Or, to include an action button:

```js
Snackbar.show({
    title: 'Hello world',
    action: {
        title: 'UNDO',
        color: 'green',
        onPress: () => { /* Do something. */ },
    },
});
```

TODO: Add screenshots :sunglasses:
