/**
 * Created by taranjeet.s on 1/25/2017.
 */
import React,{ Component } from 'react';
import { checkAuth } from '../actions';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
class SplashScreen extends Component {
    componentWillMount() {
        this.props.checkAuth();
    }
    render(){
        return(
            <View>
                <Text>Pharneechar</Text>
            </View>
        );
    }
}
export default connect(null,{checkAuth})(SplashScreen);