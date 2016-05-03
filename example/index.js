import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Snackbar from 'react-native-snackbar';

class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          React Native Snackbar
        </Text>
        <Text style={styles.button} onPress={() => Snackbar.show({title: 'Hello Wordl!'})}>
          Simple Snackbar
        </Text>
        <Text style={styles.button} onPress={() => Snackbar.show({
          title: 'Hello World! How are you doing today?! Enjoying the sun?',
          duration: Snackbar.LENGTH_LONG,
        })}>
          Snackbar two lines
        </Text>
        <Text style={styles.button} onPress={() => Snackbar.show({
          title: 'Please agree to this',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'AGREE',
            onPress: () => Snackbar.show({title: 'Thank you'}),
            color: 'green'
          }
        })}>
          Snackbar with action
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  button: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: 'green',
  },
});

AppRegistry.registerComponent('Example', () => Example);
