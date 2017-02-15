/**
 * Created by taranjeet.s on 1/25/2017.
 */
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
const root_url = "http://tangolar.com/ph/seller/seller/api/v1/visitor/details?";
export const coustomerDetails = ({slug,mobile,color}) => {
    //this is to fetch the details when we click on the list item
    return (dispatch) => {
        dispatch({ type : 'loading_details_of_visitor',payload : true });
        AsyncStorage.getItem('key',(err,result) => {
            const token = `Bearer ${result}`;
            axios.get(`${root_url}company_slug=${slug}&mobile=${mobile}`, {
                headers: { Authorization: token}
            }).then(response => {
                if(response.data.status == 'failed'){
                    dispatch({ type : 'details_reset' });
                    Actions.visitorcreate();
                    dispatch({ type : 'loading_details_of_visitor',payload : false });
                }else{
                    dispatch({ type : 'details_reset' });
                    dispatch({
                        type : 'coustomer_details_okay',
                        coustomer : response.data.customer,
                        visits : response.data.visits,
                        orders : response.data.orders_count
                    });
                    dispatch({
                        type : 'mobile_property',
                        payload : mobile
                    });
                    Actions.coustomerdetails({color});
                    dispatch({ type : 'loading_details_of_visitor',payload : false });
                }
            }).catch(error => {
                console.log("the error is ",error);
                let errors = response.data.errors;
                //do continue
            });
        });

    };
};
export const coustomerUpdate = ({props,value}) => {
    return {
        type: 'coustomer_update',
        payload: {props: props , value : value}
    };
};