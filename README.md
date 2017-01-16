# react-native-snackbar

[![npm downloads](https://img.shields.io/npm/dm/react-native-snackbar.svg)](https://www.npmjs.com/package/react-native-snackbar)
[![npm version](https://img.shields.io/npm/v/react-native-snackbar.svg)](https://www.npmjs.com/package/react-native-snackbar)
[![Latest GitHub tag](https://img.shields.io/github/tag/cooperka/react-native-snackbar.svg)](https://github.com/cooperka/react-native-snackbar)

Material-design "Snackbar" component for both Android and iOS.

See [Google Design](https://material.google.com/components/snackbars-toasts.html) for more info on Snackbars.

## Installation

To use this module, you should do the following:

1. In your React Native project, run:
    - Using npm: `npm install react-native-snackbar`
    - Using Yarn: `yarn add react-native-snackbar`

2. Link the library using `react-native link react-native-snackbar`
    - Learn more about linking [here](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)

3. Import it in your JS where you want to show a snackbar:

    ```js
    import Snackbar from 'react-native-snackbar';
    ```

## Usage

To show a simple Snackbar:

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

It will appear on-screen as follows:

![Snackbar screenshot](example/screenshots/snackbar.png)

## Notes

A few people have suggested that the default Gradle configs created by `react-native init` are too outdated.
If you have issues compiling for Android after linking this library,
please try upgrading Gradle to the latest version (e.g. `com.android.tools.build:gradle:2.2.2`).
You should also be using the latest `compileSdkVersion` (e.g. `25`) and `buildToolsVersion` (e.g. `25.0.2`).
See [#2](https://github.com/cooperka/react-native-snackbar/issues/2) for more info.
