/**
 * Created by taranjeet.s on 1/25/2017.
 */
const root_url = "http://tangolar.com/ph/seller/seller/api/v1/visitor/add/order";
const root_url_two = "http://tangolar.com/ph/seller/seller/api/v1/visitor/details?";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
export const addOrder = ({slug,mobile,type,amount,date,sku}) => {
    return (dispatch) => {
        dispatch({type : 'order_loading'});
        AsyncStorage.getItem('key',(err,result) => {
            console.log("the token is",result);
            const temp = `Bearer ${result}`;
            axios.get(`${root_url}?company_slug=${slug}&sku=${sku}&mobile=${mobile}&amount=${amount}&date=${date}&type=${type}`, {
                headers: { Authorization: temp}
            }).then(response => {
                console.log(response.data);
                if(response.data.status == 'failed'){
                        dispatch({type : 'order_error', payload : response.data.errors});
                }
                if(response.data.status == 'success'){
                    dispatch({type : 'order_added',});
                    axios.get(`${root_url_two}company_slug=${slug}&mobile=${mobile}`, {
                        headers: { Authorization: temp}
                    }).then(response => {
                        dispatch({ type : 'details_reset' });
                        dispatch({
                            type : 'coustomer_details_okay',
                            coustomer : response.data.customer,
                            visits : response.data.visits,
                            orders : response.data.orders_count
                        });
                    }).catch(error => {
                        console.log('error',error);
                    });
                    Actions.coustomerdetails();
                }
            }).catch(error => {
                dispatch({
                    type : 'order_error',
                    payload : []
                });
                console.log("the error is ",error);
                let errors = response.data.errors;
                //do continue
            });
        });

    };
};
export const orderupdate = ({props,value}) => {
    return (dispatch) => {
        dispatch({
            type: 'orderUpdate',
            payload: {props: props , value : value}
        });
        dispatch({type : 'order_error',payload : []});
    };
};