/**
 * Created by taranjeet.s on 1/5/2017.
 */
import React from 'react';
import { View,ActivityIndicator,Text } from 'react-native';

const Spinner = (props) => {

    return (
        <View style={styles.SpinnerStyle}>
            <ActivityIndicator size={props.size || 'large'}></ActivityIndicator>
        </View>
    );
};

const styles = {
    SpinnerStyle : {
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1
    }
};
export {Spinner};