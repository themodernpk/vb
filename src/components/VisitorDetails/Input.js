/**
 * Created by taranjeet.s on 1/5/2017.
 */
import React, { Component } from 'react';
import { TextInput,View,Text } from 'react-native';

const Input = ({ value,onChangeText,placeholder }) => {
    const { labelStyle,inputStyle,containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <TextInput
                placeholder={placeholder}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}>
            </TextInput>
        </View>
    );
}
const styles = {
    inputStyle : {
        color : "#000",
        paddingRight : 5,
        paddingLeft : 5,
        fontSize : 18,
        lineHeight : 30,
        height : 50,
        width : 100
    },
   /* labelStyle : {
        fontSize : 20,
        fontWeight : '600',
        color : '#6C3483',
        paddingLeft: 20,
        lineHeight : 30,
        flex : 1
    },*/
    containerStyle : {
        height : 50,
    }
};
export default Input;