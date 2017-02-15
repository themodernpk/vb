/**
 * Created by taranjeet.s on 1/24/2017.
 */
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
const root_url = "http://tangolar.com/ph/seller/seller/api/v1/add/customer?";
const root_url_two = "http://tangolar.com/ph/seller/seller/api/v1/";
const root_url_three = "http://tangolar.com/ph/seller/seller/api/v1/visitor/add/order";
export const visitorupdate = ({props,value}) => {
    return (dispatch) => {
        dispatch({type : 'has_errors', payload : []});
        dispatch({
            type: 'visitor_update',
            payload: {props: props , value : value}
        });
    };
};
export const SaveVisitor = ({name,mail_id,dob,anniversary,created_at,slug,mobile,sku,amount,type}) => {
    console.log("the props are",name,mail_id,dob,anniversary,created_at,slug,mobile,sku,amount,type);
    return (dispatch) => {
        dispatch({type : 'visitor_loading',payload : true});
        AsyncStorage.getItem('key',(err,result) => {
            const temp = `Bearer ${result}`;
            if(!mail_id){
                mail_id = '';
            }
            if(!anniversary){
                console.log("the anniversad is",anniversary);
                anniversary = '';
            }
            if(!dob){
                console.log("the dob is",dob);
                dob = '';
            }
            axios.get(`${root_url}company_slug=${slug}&dob=${dob}&created_at=${created_at}&anniversary=${anniversary}&mobile=${mobile}&name=${name}&visited_on=${created_at}&email=${mail_id}`, {
                headers: { Authorization: temp}
            }).then(response => {
                if(response.data.status == 'success'){
                    //if request to add visit is successfull then
                    console.log("the visitor is saved");
                    if(type || sku || amount){
                        axios.get(`${root_url_three}?company_slug=${slug}&sku=${sku}&mobile=${mobile}&amount=${amount}&date=${created_at}&type=${type}`, {
                            headers: { Authorization: temp}
                        }).then(response => {
                            if(response.data.status == 'success'){
                                //if the add of order is successfull
                                console.log("the order was successfull");
                                Actions.dashboard();
                                dispatch({ type : 'order_added' });
                                axios.get(`http://tangolar.com/ph/seller/seller/api/v1/visitors?company_slug=${slug}`, {
                                    headers: { Authorization: "Bearer 862fee89effa9e7be6f7654550ec131d" }
                                }).then(response => {
                                    dispatch({type : 'visitors_fetch_okay', payload : response.data});
                                    dispatch({type : 'mobile_changed', payload : ''});
                                    dispatch({ type : 'moment_time',payload : ''});
                                    dispatch({type : 'visitor_loading',payload : false});

                                }).catch(error => {
                                    dispatch({type : 'visitor_loading',payload : false});
                                });
                                dispatch({ type : 'order_added' });
                                dispatch({ type : 'form_reset' });
                                Actions.dashboard();
                            }
                            //if there are errors while adding a order
                            if(response.data.status == 'failed'){
                                console.log("failed to add the order",response.data);
                                dispatch({type : 'has_errors',payload:response.data.errors});
                                dispatch({type : 'visitor_loading',payload : false});
                            }
                        }).catch(error => {
                            dispatch({type : 'visitor_loading',payload : false});
                        });
                    }
                    else {
                        console.log("the visitor is saved",response.data);
                        dispatch({ type : 'details_reset' });
                        Actions.dashboard();
                        axios.get(`http://tangolar.com/ph/seller/seller/api/v1/visitors?company_slug=${slug}`, {
                            headers: { Authorization: "Bearer 862fee89effa9e7be6f7654550ec131d" }
                        }).then(response => {
                            dispatch({
                                type : 'visitors_fetch_okay',
                                payload : response.data
                            });
                            dispatch({type : 'mobile_changed', payload : ''});
                            dispatch({ type : 'moment_time',payload : ''});
                            dispatch({type : 'visitor_loading',payload : false});

                        }).catch(error => {
                            dispatch({type : 'visitor_loading',payload : false});
                        });
                        Actions.dashboard();
                    }
                }
                if(response.data.status == 'failed'){
                    //if the request to add visit fails then
                    console.log("failed to update the visit",response.data);
                    dispatch({type : 'visitor_loading',payload : false});
                    dispatch({type : 'has_errors',payload:response.data.errors});
                    dispatch({ type : 'form_reset' });
                }
            }).catch(error => {
                console.log("the error is ",error);
                let errors = response.data.errors;
                //do continue
            });
        });

    };
}

