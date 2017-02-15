/**
 * Created by taranjeet.s on 1/23/2017.
 */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
const root_url = 'http://tangolar.com/ph/seller/seller/api/v1/getToken';
import { Actions } from 'react-native-router-flux';
export const emailChanged = (text) => {
    return {
        type : 'email_changed',
        payload : text
    };
};
export const passwordChanged = (text) => {
    return {
        type : 'password_changed',
        payload : text
    };
};
const loginUserSuccess= (dispatch,user) => {
    console.log(user.data.api_token);
    AsyncStorage.setItem('key',user.data.api_token);
    dispatch({
        type : 'auth_loading',
        payload : false
    });
    dispatch({
        type : 'login_user_okay',
        payload : user
    });
    Actions.companylist({type : 'reset'});
};
export const loginUser = ({ email,password })=> {
    return (dispatch) => {
        dispatch({
            type : 'auth_loading',
            payload : true
        });
        console.log("the email is "+email+ " and the password is "+password);
        //axios.get("http://tangolar.com/ph/seller/seller/api/v1/getToken?email=pradeeep@webreinvent.com&password=demo1234")
        axios.get(`${root_url}?email=${email}&password=${password}`)
            .then(response => {
                console.log("the response from loginnn is ",response.data);
                if(response.data.status == 'success'){
                    loginUserSuccess(dispatch,response.data);
                }
                if(response.data.status == 'failed'){
                    loginUserFailed(dispatch,response.errors);
                }
            })
            .catch((error) => {
                console.log(error);
                loginUserFailed(dispatch,response.data.errors);
            });
    };
};
const loginUserFailed = (dispatch,errors) => {
    let loginErrors = '';

    console.log(errors);
    console.log("login failed");
    dispatch({
        type : 'auth_loading',
        payload : false
    });
    dispatch({ type : 'login_user_failed',payload : loginErrors});
};
export const checkAuth = (dispatch) => {
    return (dispatch) => {
        AsyncStorage.getItem('key',(err,result) => {
            if(result){
                Actions.companylist();
            }else{
                Actions.login();
            }
        });
        dispatch({type : "not_anything"});
    };
};