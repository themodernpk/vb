/**
 * Created by taranjeet.s on 1/5/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View,TextInput,Text,Image,StyleSheet } from 'react-native';
import { Card,CardSection,Input } from './common';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from './loginScreen/Button';
import * as actions from '../actions/index';
import Bg_top from '../assets/bg_top.png';
import Bg_btm from '../assets/bg_btm.png';
import ManImage from '../assets/login_screen_image.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Makiko } from 'react-native-textinput-effects';

class LoginForm extends Component{
    onEmailChange(text){
        this.props.emailChanged(text);
    }
    onPasswordChange(text){
        this.props.passwordChanged(text);
    }
    onSubmit(){
        let email = this.props.email;
        let password = this.props.password;
        this.props.loginUser({ email : this.props.email,password:this.props.password });
    }
    renderButton() {
    if(this.props.loading){
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.props.loading} size="large" />
            </View>
        );
    }
    return (
        <Button onPress={this.onSubmit.bind(this)}>Login</Button>
    );
};
    render() {
        return (
            <View>
                <View><Image source={Bg_top} style={{ position: 'absolute',width : 100,height : 100 }} /></View>
                <View style={ styles.imageStyle } >
                    <Image source={ManImage} />
                </View>
                <View style={styles.textViewStyleone}>
                    <Text style={styles.textStyleone}>Login Account</Text>
                </View>
                <View style={styles.textViewStyletwo}>
                    <Text style={styles.textStyletwo}>Please enter your seller account credentials</Text>
                </View>

                <View style={{ paddingRight:20,paddingLeft : 20 }}>
                    <View style={{ paddingTop : 20 }}>
                        <Makiko
                            label={'Username'}
                            iconClass={FontAwesome}
                            iconName={'user'}
                            labelStyle={{ color : 'red' }}
                            keyboardType={'email-address'}
                            iconColor={'#bcc8ce'}
                            onChangeText={ email => this.onEmailChange(email)}
                            value={this.props.email}
                            inputStyle={{ color: 'green' }}
                        />
                    </View>

                    <View style={{ paddingTop : 15,paddingBottom : 20 }}>
                        <Makiko
                            secureTextEntry
                            label={'Password'}
                            iconClass={FontAwesome}
                            iconName={'unlock-alt'}
                            labelStyle={{ color : 'red' }}
                            iconColor={'#bcc8ce'}
                            onChangeText={ password => this.onPasswordChange(password)}
                            value={this.props.password}
                            inputStyle={{ color: 'green' }}
                        />
                    </View>

                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </View>

                <Text style={styles.textStyle}>
                    {this.props.error}
                </Text>
                <View><Image source={Bg_btm} style={{ alignSelf : 'flex-end',justifyContent : 'flex-end',width : 90,height : 90,marginTop : 50 }} /></View>
            </View>
        );
    }
}
const styles = {
    textStyleone : {
        fontSize : 23,
        color : '#000000',
        fontWeight : '600'
    },
    textStyletwo : {
        fontSize : 13,
        color : '#000000'
    },
    imageStyle : {
        paddingTop : 40,
        justifyContent: 'center',
        alignItems : 'center',
    },
    textViewStyleone : {
        paddingTop : 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textViewStyletwo : {
        paddingTop : 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom : 10
    },
    textStyle : {
        color : 'red',
        alignSelf : 'center',
        marginTop : 10
    }

};
function mapStateToProps({auth}) {
    const { email,password,error,user,loading } = auth;
    return { email,
        password,
        user,
        error,
        loading
    };
};
export default connect(mapStateToProps,actions)(LoginForm);
