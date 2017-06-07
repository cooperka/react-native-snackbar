import React, { Component } from 'react';
import { Text, View } from 'react-native';
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

        <Text style={styles.button} onPress={() => Snackbar.show({ title: 'Hello, World!' })}>
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

        <Text
          style={styles.button}
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
          Snackbar with style
        </Text>
        <Text
          style={styles.button}
          onPress={() => {
            Snackbar.dismiss();
          }}
        >
            Dismiss active snackbar(s)
        </Text>
      </View>
    );
  }

}

export default Example;
