/**
 * Created by taranjeet.s on 1/23/2017.
 */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
const root_url = "http://tangolar.com/ph/seller/seller/api/v1/";
export const fetchCompanies = () => {
    return (dispatch) => {
        dispatch({ type : 'loading' });
        AsyncStorage.getItem('key',(err,result) => {
            const temp = `Bearer ${result}`;
            axios.get(`${root_url}companies/list`, {
                headers: { Authorization: temp }
            }).then(response => {
                dispatch({
                    type : 'companies_fetch_okay',
                    payload : response.data
                });
            }).catch(error => {
                console.log("the error is ",error);
            });
        });
     };
};