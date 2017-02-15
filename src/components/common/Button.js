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
        fontSize : 25,
        fontWeight : '400',
    },
    buttonStyle : {
        justifyContent : 'center',
        flex : 1,
        height : 50,
        backgroundColor: '#6C3483',
        borderRadius:25,
        marginTop : 20,
        marginLeft:80,
        marginRight:80
    }
};
export { Button };