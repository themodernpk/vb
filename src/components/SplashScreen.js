/**
 * Created by taranjeet.s on 1/25/2017.
 */
import React,{ Component } from 'react';
import { checkAuth } from '../actions';
import { View,Text,Image,Dimensions,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import SplashScreenImage from '../assets/Splash_screen.png';
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { width : '' ,height: '' };
    }
    componentWillMount() {
        StatusBar.setHidden(true)
        var {height, width} = Dimensions.get('window');
        this.setState({ width,height });
        setTimeout (() => {
            this.props.checkAuth();
            },1000);
    }
    componentWillUnmount() {
        StatusBar.setHidden(false);
        StatusBar.setBackgroundColor('#087658',true);
    }
    render(){
        return(
            <View style={{flex: 1}} >
                <Image style={{backgroundColor:'white',width : this.state.width,height : (this.state.height)-10}} source={SplashScreenImage}></Image>
            </View>
        );
    }
}
export default connect(null,{checkAuth})(SplashScreen);