/**
 * Created by taranjeet.s on 1/4/2017.
 */
//import react
import React from 'react';
import { Text,View } from 'react-native';

//make a component
const Header = (props) => {
    const { textStyle,viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    textStyle : {
        fontSize : 30
    },
    viewStyle : {
        backgroundColor : "#F8F8F8",
        justifyContent:"center",
        alignItems : "center",
        height : 60,
        paddingTop:15,
        position: "relative"

    }
};
//make component available to others
export {Header} ;