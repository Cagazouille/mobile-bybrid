import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

class Spinner extends Component {
    render() {
        return (
            <View>
            <ActivityIndicator size='small' />
            </View>
        );
    }
}

export default Spinner;
