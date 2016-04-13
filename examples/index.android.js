import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Snackbar from './react-native-snackbar';

class examples extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={() => Snackbar.show({title: 'Coucou Remi Rohlalal',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Click',
            onPress: () => Snackbar.show({title: 'Nice action'}),
            color: '#FF0000'
          }
        })}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('examples', () => examples);
