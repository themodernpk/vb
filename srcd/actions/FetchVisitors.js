/**
 * Created by taranjeet.s on 1/23/2017.
 */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
const root_url = "http://tangolar.com/ph/seller/seller/api/v1";
export const fetchVisitors = (slug) => {
    return (dispatch) => {
        axios.get(`${root_url}/visitors?company_slug=${slug}`, {
            headers: { Authorization: "Bearer 862fee89effa9e7be6f7654550ec131d" }
        }).then(response => {
            dispatch({
                type : 'visitors_fetch_okay',
                payload : response.data
            });
        }).catch(error => {
            console.log("the error is ",error);
        });
    };
};
export const fetchCoustomer = (slug,mobile) => {
    return (dispatch) => {
        dispatch({type : 'loading'});
        AsyncStorage.getItem('key',(err,result) => {
            console.log("the token is",result);
            const temp = `Bearer ${result}`;
            axios.get(`${root_url}/find/customer?company_slug=${slug}&mobile=${mobile}`, {
                headers: { Authorization: temp}
            }).then(response => {
                if(response.data.status == 'success'){
                    dispatch({ type : 'details_reset' });
                    dispatch({
                        type : 'coustomer_fetch_okay',
                        payload : response.data
                    });
                    console.log("the visitor sent to the visitor edit is",response.data.customer)
                    Actions.visitoredit({ visitor : response.data.customer });
                }
                if(response.data.status == 'failed'){
                    dispatch({ type : 'details_reset' });
                    Actions.visitorcreate();
                }
            }).catch(error => {
                console.log("the error is ",error);
                let errors = response.data.errors;
                //do continue
            });
        });

    };
};
export const mobileChanged = (mobile) => {
    return {
        type : 'mobile_changed',
        payload : mobile
    };
};