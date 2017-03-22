# React Native Snackbar

[![Build status](https://travis-ci.org/cooperka/react-native-snackbar.svg?branch=master)](https://travis-ci.org/cooperka/react-native-snackbar)
[![npm downloads](https://img.shields.io/npm/dm/react-native-snackbar.svg)](https://www.npmjs.com/package/react-native-snackbar)
[![npm version](https://img.shields.io/npm/v/react-native-snackbar.svg)](https://www.npmjs.com/package/react-native-snackbar)
[![Latest GitHub tag](https://img.shields.io/github/tag/cooperka/react-native-snackbar.svg)](https://github.com/cooperka/react-native-snackbar)

Material-design "Snackbar" component for Android and iOS:

![Snackbar screenshot](example/screenshots/snackbar.png)

Snackbars are used for displaying a brief message to the user, along with an optional action.
They animate up from the bottom of the screen and then disappear shortly afterward.

See Google's [Material Design guidelines](https://material.io/guidelines/components/snackbars-toasts.html) for more info on Snackbars
and when to use them.

## Code

```js
Snackbar.show({
    title: 'Hello world',
    duration: Snackbar.LENGTH_SHORT,
});
```

Or, to include an action button:

```js
Snackbar.show({
    backgroundColor: 'gray',
    title: 'Hello world',
    duration: Snackbar.LENGTH_LONG,
    action: {
        title: 'UNDO',
        color: 'green',
        onPress: () => { /* Do something. */ },
    },
});
```

Where `duration` can be one of the following:

- `Snackbar.LENGTH_SHORT` (about a second)
- `Snackbar.LENGTH_LONG` (about three seconds)
- `Snackbar.LENGTH_INDEFINITE` (stays on screen until the button is pressed)

## Installation

Here's how to use it:

1. Install:
    - Using [npm](https://www.npmjs.com/#getting-started): `npm install react-native-snackbar --save`
    - Using [Yarn](https://yarnpkg.com/): `yarn add react-native-snackbar`

2. [Link](https://facebook.github.io/react-native/docs/linking-libraries-ios.html):
    - `react-native link react-native-snackbar`

3. Import it in your JS:

    ```js
    import Snackbar from 'react-native-snackbar';
    ```

## Notes

A few people have [suggested](https://github.com/cooperka/react-native-snackbar/issues/2)
that the default Gradle configs created by `react-native init` are too outdated.
If you have issues compiling for Android after linking this library,
please try upgrading Gradle to the latest version! For example:

In your `android/build.gradle`:

- `com.android.tools.build:gradle:2.2.2`

In your `android/app/build.gradle`:

- `compileSdkVersion 25`
- `buildToolsVersion "25.0.2"`
