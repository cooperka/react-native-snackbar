import React, { Component } from 'react';
import { AppRegistry, Text, View, Modal, TouchableHighlight } from 'react-native';
import Snackbar from 'react-native-snackbar';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class Example extends Component {

  state = {
    modalVisible: false,
  };

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

        <TouchableHighlight
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <Text style={styles.button}>Show Modal</Text>
        </TouchableHighlight>

        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={{ flex: 1, paddingTop: 40, backgroundColor: 'rgba(200, 0, 0, 0.6)' }}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  Snackbar.show({
                    title: 'Hello world',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                }}
              >
                <Text style={styles.button}>Show Snackbar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => { this.setState({ modalVisible: false }); }}
              >
                <Text style={styles.button}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

}

AppRegistry.registerComponent('SnackbarExample', () => Example);

export default Example;
