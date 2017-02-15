/**
 * Created by taranjeet.s on 1/20/2017.
 */
const Initial_State = { moment_time : '',companylist : {}, visitorlist : {},searching_mobile : false,mobile:'',selected_company: '',loading:false,error:"" };
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
        case 'reset_visitor_list' :
            return { ...state };
        case 'searching_mobile' :
            return { ...state,searching_mobile : action.payload };
        case 'companies_fetch_okay' :
            return {...state,companylist:action.payload,loading:false };
        case 'visitors_fetch_okay' :
            return {...state,visitorlist:action.payload,loading:false };
        case 'moment_time':
            return { ...state,moment_time : action.payload };
        case 'coustomer_fetch_okay' :
            return {...state,coustomerlist:action.payload,mobile:'',loading:false };
        default :
            return state;
    }
};