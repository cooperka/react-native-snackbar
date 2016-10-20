# react-native-snackbar

Implementation of the material design Snackbar component for both Android and iOS. See [Google Design](https://material.google.com/components/snackbars-toasts.html) for more info.

## Installation

To use this extension, you have to do the following steps:

1. In your react-native project, run
	```
	npm install react-native-snackbar
	```

2. Link the library using `react-native link react-native-snackbar` (learn more about [linking](https://facebook.github.io/react-native/docs/linking-libraries-ios.html).

3. Import it in you JS, where you want to show a snackbar
	```
	import Snackbar from 'react-native-snackbar'
	```

## Usage

To show a simple snackbar simply call:
```
Snackbar.show({
	title: 'Hello world',

	// Optional duration. Can be one of LENGTH_LONG | LENGTH_SHORT | LENGTH_INDEFINITE.
	duration: Snackbar.LENGTH_LONG,
})
```

*..Preview..*

To add an action:
```
Snackbar.show({
	title: 'Hello world',
	action: {
		title: 'UNDO',
		color: 'green',
		onPress: () => {
			// do something here
		},
	},
})
```

Note that actions do not currently work on Android. Feel free to submit a PR!

*..Preview..*
