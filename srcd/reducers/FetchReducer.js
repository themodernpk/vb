/**
 * Created by taranjeet.s on 1/20/2017.
 */
const Initial_State = { companylist : {}, visitorlist : {},mobile:'',selected_company: '',loading:false,error:"" };
export default (state = Initial_State,action) => {
    switch (action.type){
        case 'selected_company' :
            return { ...state,selected_company : action.payload };
        case 'clear-mobile':
            return { ...state,mobile : '' };
        case 'mobile_changed' :
            return {...state,mobile:action.payload,error:'' };
        case 'loading':
            return { ...state,loading : true };
        case 'companies_fetch_okay' :
            return {...state,companylist:action.payload,loading:false };
        case 'visitors_fetch_okay' :
            return {...state,visitorlist:action.payload,loading:false };
        case 'coustomer_fetch_okay' :
            return {...state,coustomerlist:action.payload,mobile:'',loading:false };
        default :
            return state;
    }
};