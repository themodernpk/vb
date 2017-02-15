/**
 * Created by taranjeet.s on 1/20/2017.
 */
/*This reducer is managing the change of email mobile and other data of the edit and create form
* It is managing form-reset
* and handling coustomer details fetching
* */
const Initial_State = { last_visit:'',name : '',mobile : "",email :"",loading:false,error:[],visitordetails:{},visitorvisits:{},color : "" };
export default (state = Initial_State,action) => {
    switch (action.type){
        case 'coustomerUpdate' :
            return {...state,[action.payload.props]:action.payload.value,error:'',loading : false };
        case 'visitor_update' :
            return {...state,[action.payload.props]:action.payload.value,error:'',loading : false };
        case 'details_reset' :
            return { ...state,name : '',mobile : '',email: '',dob : '',anniversary: '' };
        case 'coustomer_details_okay' :
            return { ...state,coustomerdetails:action.coustomer,coustomervisits : action.visits,coustomerorders : action.orders };
        case 'loading_customer':
            return { ...state,loading : action.payload };
        case 'loading_details_of_visitor' :
            return { ...state,loading : action.payload };
        case 'visitor_loading':
            console.log("the visitor is loading in reducer",action.payload);
            return { ...state,loading :action.payload };
        case 'last_visit_on':
            return { ...state,last_visit:action.payload };
        case 'has_errors':
            return { ...state,error : action.payload };
        case 'set_color':
            return { ...state,color : action.payload };
        case 'set_order_number':
            return { ...state,coustomerorders: action.payload };
        default :
            return state;
    }
};