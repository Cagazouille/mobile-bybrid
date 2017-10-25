import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
          <Text style={labelStyle}>{label.toUpperCase()}</Text>
          <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            style={inputStyle}
          />
        </View>
    );
};

const styles = {
    inputStyle: {
      marginTop: 0,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: 'black',
        width: '100%',
        fontSize: 18,
        fontWeight: '200',
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 40
    },
    labelStyle: {
        fontSize: 12,
        color: 'black',
        fontWeight: '200',
        flex: 1
    },
    containerStyle: {
//      paddingTop: '10%',
        height: 65,
    }
};

export { TitledInput };
