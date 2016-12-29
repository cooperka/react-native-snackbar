/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Snackbar from 'react-native-snackbar';

class Example extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Snackbar Examples
        </Text>

        <Text style={styles.button} onPress={() => Snackbar.show({title: 'Hello, World!'})}>
          Simple Snackbar
        </Text>

        <Text
          style={styles.button}
          onPress={() => Snackbar.show({
            title: 'Hello, World! How are you doing today? Enjoying the sun?! This should wrap to two lines.',
            duration: Snackbar.LENGTH_LONG,
          })}
        >
          Simple Snackbar - two lines
        </Text>

        <Text
          style={styles.button}
          onPress={() => Snackbar.show({
            title: 'Please agree to this.',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              title: 'AGREE',
              onPress: () => Snackbar.show({ title: 'Thank you!' }),
              color: 'green',
            },
          })}
        >
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

AppRegistry.registerComponent('SnackbarExample', () => Example);
