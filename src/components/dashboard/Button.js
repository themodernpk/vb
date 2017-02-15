/**
 * Created by taranjeet.s on 1/4/2017.
 */
import React from 'react';
import { Text,TouchableOpacity } from 'react-native';

const Button = ({onPress,children}) => {
    const { buttonStyle,textStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress}style={buttonStyle} activeOpacity={0.6}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    textStyle:{
        alignSelf:'center',
        color : '#FDFEFE',
        fontSize : 12,
        fontWeight : '400',
    },
    buttonStyle : {
        justifyContent : 'center',
        height : 48,
        backgroundColor: '#199d79',
    }
};
export {Button} ;