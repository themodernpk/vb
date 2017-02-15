/**
 * Created by taranjeet.s on 1/24/2017.
 */
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
const root_url = "http://tangolar.com/ph/seller/seller/api/v1/add/customer?";
export const visitorupdate = ({props,value}) => {
    return {
        type: 'visitor_update',
        payload: {props: props , value : value}
    };
};
export const SaveVisitor = ({name,mail_id,dob,anniversary,created_at,slug,mobile}) => {
    console.log("the slug is in visitor update is ",slug);
    return (dispatch) => {
        dispatch({type : 'loading'});
        AsyncStorage.getItem('key',(err,result) => {
            const temp = `Bearer ${result}`;
            axios.get(`${root_url}company_slug=${slug}&d0b=${dob}&created_at=${created_at}&anniversary=${anniversary}&mobile=${mobile}&name=${name}&visited_on=${created_at}&email=${mail_id}`, {
                headers: { Authorization: temp}
            }).then(response => {
                if(response.data.status == 'success'){
                    console.log("the visitor is saved");
                    dispatch({ type : 'details_reset' });
                    dispatch({
                        type : 'coustomer_fetch_okay',
                        payload : response.data
                    });
                    Actions.companylist();
                    // Actions.dashboard({ slug : slug })
                }
                if(response.data.status == 'failed'){
                    console.log("failed update",response.data);
                    dispatch({ type : 'form_reset' });
                    Actions.companylist();
                    // Actions.dashboard({ slug : slug })
                }
            }).catch(error => {
                console.log("the error is ",error);
                let errors = response.data.errors;
                //do continue
            });
        });

    };
}
/*export const UpdateVisitor = ({ name,phone,email,id }) => {
    console.log("the employ save order in actions ",name);
    console.log('the employ save order in actions',phone);
    const { currentUser } = axios('gf');
    return (dipatch) => {
        axios.get('dsfdsf')
            .set({ name,phone,shift })
            .then(() => {
                Actions.employeelist();
                dispatch({
                    type : 'form_reset'
                });
            })
            .catch(error => console.log(error));
    };
};*/
/*export const createVisitor = (props) => {
    console.log("the props in the create user is",props);
    console.log(currentUser);
    return (dispatch) => {
        axios.get('sdfdsf')
            .then(() => {
                dispatch({
                    type : "user_created",
                    payload : true
                });
                dispatch({
                    type : "form_reset",
                    payload : true
                });
                //Actions.employeelist();
            }).catch((error) => {
            console.log("the error is ",error);
            //Actions.employeelist();
            dispatch({
                type : "user_created",
                payload : false
            });
        });
    };
};*/
/*export const employeeSave = ({ name,phone,shift,uid }) => {
    console.log("the employ save order in actions ",name);
    console.log('the employ save order in actions',phone);
    const { currentUser } = axios .auth();
    return (dipatch) => {
        axios.get('dsfdsf')
            .set({ name,phone,shift })
            .then(() => {
                Actions.employeelist();
                dispatch({
                    type : 'form_reset'
                });
            })
            .catch(error => console.log(error));
    };
};*/
/*
export const resetForm = () => {
    console.log("the request to reset form is revierv in actions");
    return {
        type : 'form_reset',
        payload : true
    };
};
*/
