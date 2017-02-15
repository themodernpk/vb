/**
 * Created by taranjeet.s on 1/4/2017.
 */
import React from 'react';
import { Text,TouchableOpacity } from 'react-native';

const Button = ({onPress,children}) => {
    const { buttonStyle,textStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress}style={buttonStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    textStyle:{
        alignSelf:'center',
        color : '#FDFEFE',
        fontSize : 22,
        fontWeight : '400',
    },
    buttonStyle : {
        justifyContent : 'center',
        flex : 1,
        height : 50,
        backgroundColor: '#199d79',
    }
};
export default Button ;