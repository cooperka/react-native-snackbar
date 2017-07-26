import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';

import styles from '../styles';

// eslint-disable-next-line react/prefer-stateless-function
class Example extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Snackbar Examples
        </Text>

        <TouchableOpacity
          onPress={() => Snackbar.show({ title: 'Hello, World!' })}
        >
          <Text style={styles.button}>
            Simple Snackbar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Snackbar.show({
            title: 'Hello, World! How are you doing today? Enjoying the sun?! This should wrap to two lines.',
            duration: Snackbar.LENGTH_LONG,
          })}
        >
          <Text style={styles.button}>
            Simple Snackbar - two lines
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
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
          <Text style={styles.button}>
            Snackbar with action
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Snackbar.show({
            title: 'Please agree to this.',
            duration: Snackbar.LENGTH_INDEFINITE,
            backgroundColor: 'silver',
            action: {
              title: 'AGREE',
              onPress: () => Snackbar.show({ title: 'Thank you!' }),
              color: 'gold',
            },
          })}
        >
          <Text style={styles.button}>
            Snackbar with style
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Snackbar.dismiss()}
        >
          <Text style={styles.button}>
            Dismiss active Snackbar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

export default Example;
