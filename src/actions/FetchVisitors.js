/**
 * Created by taranjeet.s on 1/23/2017.
 */
import axios from 'axios';
import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
const root_url = "http://tangolar.com/ph/seller/seller/api/v1";
export const fetchVisitors = (slug,date) => {
    return (dispatch) => {
        dispatch({type : 'visitor_loading',payload : true});
        if(date){
            var visit = new Date(date);
            const nowDate =moment(visit,'YYYYMMDD').fromNow();
            const year = visit.getFullYear();
            const month_number = visit.getMonth();
            const month = month_number + 1;
            const day = visit.getDate();
            const datee = `${year}-${month}-${day}`;

            AsyncStorage.getItem('key',(err,result) => {
                const temp = `Bearer ${result}`;
                axios.get(`${root_url}/visitors?company_slug=${slug}&date=${datee}`, {
                    headers: { Authorization: "Bearer 862fee89effa9e7be6f7654550ec131d" }
                }).then(response => {
                    dispatch({
                        type : 'visitors_fetch_okay',
                        payload : response.data
                    });
                    dispatch({ type : 'moment_time',payload : nowDate});
                    dispatch({type : 'visitor_loading',payload : false});
                    Actions.dashboard();
                }).catch(error => {
                    dispatch({type : 'visitor_loading',payload : false});
                });
            });
        }
        else {
            AsyncStorage.getItem('key',(err,result) => {
                const temp = `Bearer ${result}`;
                axios.get(`${root_url}/visitors?company_slug=${slug}`, {
                    headers: { Authorization: temp }
                }).then(response => {
                    dispatch({
                        type : 'visitors_fetch_okay',
                        payload : response.data
                    });
                    dispatch({ type : 'moment_time',payload : ''});
                    dispatch({type : 'visitor_loading',payload : false});
                }).catch(error => {
                    dispatch({type : 'visitor_loading',payload : false});
                });
            });
        }
    };
};
export const fetchCoustomer = (slug,mobile) => {
    return (dispatch) => {
        dispatch({ type : 'loading_details_of_visitor',payload : true });
        dispatch({ type : 'reset_visitor_list' });
        AsyncStorage.getItem('key',(err,result) => {
            const temp = `Bearer ${result}`;
            axios.get(`${root_url}/find/customer?company_slug=${slug}&mobile=${mobile}`, {
                headers: { Authorization: temp}
            }).then(response => {
                if(response.data.status == 'failed'){
                    if(response.data.errors[0] = "Not Found"){
                        var today = new Date();
                        var day = today.getDate();
                        var month = today.getMonth()+1;
                        var year = today.getFullYear();
                        const date = `${year}-${month}-${day}`;
                        dispatch({ type : 'details_reset' });
                        Actions.visitorcreate();
                        dispatch({type: 'visitor_update',
                            payload: {props: 'created_at' , value : date}});
                        dispatch({type: 'visitor_update',
                            payload: {props: 'mobile' , value : mobile}});
                        dispatch({ type : 'loading_details_of_visitor',payload : false });
                    }
                }
                if(response.data.status == 'success'){
                    var today = new Date();
                    var day = today.getDate();
                    var month = today.getMonth()+1;
                    var year = today.getFullYear();
                    const date = `${year}-${month}-${day}`;
                    dispatch({ type : 'last_visit_on',payload : response.data.last_visit.visited_on });
                    dispatch({ type : 'details_reset' });
                    dispatch({
                        type : 'coustomer_fetch_okay',
                        payload : response.data
                    });
                    Actions.visitoredit({ visitor : response.data.customer });
                    dispatch({ type : 'loading_details_of_visitor',payload : false });
                    dispatch({type: 'visitor_update',
                        payload: {props: 'created_at' , value : date}});
                }
            }).catch(error => {
                console.log("the error is ",error);
                dispatch({ type : 'loading_details_of_visitor',payload : false });
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