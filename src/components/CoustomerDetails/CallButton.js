/**
 * Created by taranjeet.s on 1/4/2017.
 */
import React from 'react';
import { Text,TouchableOpacity,Image,View } from 'react-native';
import Phone from '../../assets/phone.png';
const CallButton = ({onPress,children}) => {
    const { buttonStyle,textStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress}style={buttonStyle}>
            <View style={{flexDirection : 'row' }}>
                <Image source={Phone} style={{ width : 12,height : 12,marginTop : 2,marginLeft : 17 }} />
                <Text style={textStyle}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    textStyle:{
        alignSelf:'center',
        color : '#FDFEFE',
        fontSize : 10,
        fontWeight : '400',
        paddingLeft : 5
    },
    buttonStyle : {
        justifyContent : 'center',
        height : 40,
        width : 70,
        backgroundColor: '#199d79',
    }
};
export default CallButton ;