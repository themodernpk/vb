/**
 * Created by taranjeet.s on 1/4/2017.
 */
import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
}

const styles = {
    containerStyle:{
        borderBottomWidth : 4,
        justifyContent : 'flex-start',
        borderRadius:5,
        flexDirection : 'row',
        position : 'relative'
    }
};
export {CardSection};