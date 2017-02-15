/**
 * Created by taranjeet.s on 1/19/2017.
 */
const Initial_State = { email : '',password : "",user:{},loading:false,error:"" };
export default (state = Initial_State,action) => {
    switch (action.type){
        case 'email_changed' :
            return {...state,email:action.payload,error:'' };

        case 'password_changed' :
            return {...state,password:action.payload,error:'' };

        case 'login_user_okay' :
            return { ...state,user : action.payload,error:''};

        case 'login_user_failed' :
            console.log("in the reducer",action.payload);
            return { ...state,error : 'authentication_failed',password:"" };

        case 'auth_loading' :
            return { ...state,loading : action.payload };

        default :
            return state;
    }
};