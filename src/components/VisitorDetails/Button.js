/**
 * Created by taranjeet.s on 1/4/2017.
 */
import React from 'react';
import { Text,TouchableOpacity,View } from 'react-native';

const Button = ({onPress,children,width}) => {
    const { buttonStyle,textStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress}style={{ flex : 1,paddingLeft : 50,paddingRight : 50,paddingTop : 5 }}>
            <View style={{height : 50, backgroundColor: '#199d79',}} >
                <Text style={textStyle}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    textStyle:{
        marginTop : 16,
        alignSelf:'center',
        color : '#FDFEFE',
        fontSize : 15,
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