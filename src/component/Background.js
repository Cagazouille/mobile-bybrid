import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';


class Background extends Component {

    render() {
        return (
            <Image source={require('./img/big-one.jpg')}
              style={styles.background}>

              {this.props.children}

            </Image>
        )
    }
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
  }
);

export default Background;
