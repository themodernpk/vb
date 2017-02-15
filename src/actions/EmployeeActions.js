/**
 * Created by taranjeet.s on 1/23/2017.
 */
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
export const employeeupdate = ({props,value}) => {
    console.log("props is updated",props);
    console.log("props is updated and the value is ",value);
    return {
        type: 'employee_update',
        payload: {props: props , value : value}
    };

};
export const createUser = (props) => {
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
                Actions.employeelist();
            }).catch((error) => {
            console.log("the error is ",error);
            Actions.employeelist();
            dispatch({
                type : "user_created",
                payload : false
            });
        });
    };
};
export const employeeSave = ({ name,phone,shift,uid }) => {
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
};
export const resetForm = () => {
    console.log("the request to reset form is revierv in actions");
    return {
        type : 'form_reset',
        payload : true
    };
};
