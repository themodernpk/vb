/**
 * Created by taranjeet.s on 1/5/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View,TextInput,Text } from 'react-native';
import { Button,Card,CardSection,Input,Spinner } from './common';
import * as actions from '../actions/index';
import firebase from 'firebase';

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
            return <Spinner />;
        }
        return (
            <Button onPress={this.onSubmit.bind(this)}>Login</Button>
        );
    };
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label = "Email"
                        placeholder="user@example.com"
                        onChangeText={ email => this.onEmailChange(email)}
                        value={this.props.email}/>
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label = "Password"
                        placeholder="password"
                        onChangeText={ password => this.onPasswordChange(password)}
                        value={this.props.password}/>
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                <Text style={styles.textStyle}>
                    {this.props.error}
                </Text>
            </Card>
        );
    }
}
const styles = {
    textStyle : {
        fontSize : 20,
        color : "red",
        alignSelf : 'center'
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
}
export default connect(mapStateToProps,actions)(LoginForm);
