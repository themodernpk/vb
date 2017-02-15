/**
 * Created by taranjeet.s on 1/25/2017.
 */
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
const root_url = "http://tangolar.com/ph/seller/seller/api/v1/visitor/details?";
export const coustomerDetails = ({slug,mobile}) => {
    console.log("the slug and mobile provided are "+mobile+ "  and slug "+slug);
    return (dispatch) => {
        dispatch({type : 'loading'});
        AsyncStorage.getItem('key',(err,result) => {
            const token = `Bearer ${result}`;
            axios.get(`${root_url}company_slug=${slug}&mobile=${mobile}`, {
                headers: { Authorization: token}
            }).then(response => {
                console.log(response);
                if(response.data.status == 'failed'){
                    dispatch({ type : 'details_reset' });
                    Actions.visitorcreate();
                }else{
                    console.log('the screen is sendt');
                    dispatch({ type : 'details_reset' });
                    dispatch({
                        type : 'coustomer_details_okay',
                        coustomer : response.data.customer,
                        visits : response.data.visits,
                        orders : response.data.orders_count
                    });
                    Actions.coustomerdetails();
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