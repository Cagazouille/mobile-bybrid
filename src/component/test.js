import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class Test extends Component {
  render() {
      return (
          <View style={styles.container}>
          <Image source={require('./img/big-one.jpg')}>
          <View style={styles.content}>
          <Text style={styles.text}>lala</Text>
          </View>
          </Image>

          </View>
      );
  }
}

const styles = {
    container: {
      flex: 1,
    },
    content: {
      alignItems: 'center',
    },
    logo: {
      flex: 1,
      alignSelf: 'stretch',
      width: null,
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 40,
      fontStyle: 'italic',
      fontWeight: 'bold',
    }
};

export default Test;
