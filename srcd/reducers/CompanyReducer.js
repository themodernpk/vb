/**
 * Created by taranjeet.s on 1/20/2017.
 */
/*This reducer is managing the change of email mobile and other data of the edit and create form
* It is managing form-reset
* and handling coustomer details fetching
* */
const Initial_State = { name : '',mobile : "",email :"",loading:false,error:"",visitordetails:{},visitorvisits:{} };
export default (state = Initial_State,action) => {
    switch (action.type){
        case 'coustomerUpdate' :
            return {...state,[action.payload.props]:action.payload.value,error:'' };
        case 'visitor_update' :
            return {...state,[action.payload.props]:action.payload.value,error:'' };
        case 'details_reset' :
            return { ...state,name : '',mobile : '',email: '',dob : '',created_at :'',anniversary: '' };
        case 'coustomer_details_okay' :
            return { ...state,coustomerdetails:action.coustomer,coustomervisits : action.visits,coustomerorders : action.orders };
        default :
            return state;
    }
};