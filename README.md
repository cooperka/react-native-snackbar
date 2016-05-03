# react-native-snackbar
Implementation of the material design snacker component. See [Google Design](https://www.google.com/design/spec/components/snackbars-toasts.html#snackbars-toasts-usage)


## Installation
To use this extension, you have to do the following steps:

1. In your react-native project, run 
	```
	npm install react-native-snackbar
	```
	
2. Link your library using `rpm link` (learn more about [rnpm](https://github.com/rnpm/rnpm)) or following react-native doc [guide](http://facebook.github.io/react-native/docs/linking-libraries-ios.html).

3. Import it in you JS, where you want to show a snacker
	```
	import Snackbar from 'react-native-snackbar' 
	```

## Usage

To show a simple snackbar simply call:
```
Snackbar.show({
	title: 'Hello world',
	duration: Snackbar.LENGTH_INDEFINITE, // optional
	// Can be .LENGTH_INDEFINITE | .LENGTH_LONG | LENGTH_SHORT
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
*..Preview..*





