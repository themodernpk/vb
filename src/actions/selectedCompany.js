/**
 * Created by taranjeet.s on 1/24/2017.
 */
import { AsyncStorage } from 'react-native';
export const selectedCompany = (company) => {
    AsyncStorage.setItem('company_name',company.name);
    AsyncStorage.setItem('company_slug',company.slug);
    return (dispatch) => {
        dispatch({
            type : 'selected_company',
            payload : company
        });
    };
};