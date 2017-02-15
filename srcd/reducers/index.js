/**
 * Created by taranjeet.s on 1/6/2017.
 */
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CompanyReducer from './CompanyReducer';
import FetchReducer from './FetchReducer';
export default combineReducers({
    auth : AuthReducer,
    coustomer : CompanyReducer,
    companies : FetchReducer
});