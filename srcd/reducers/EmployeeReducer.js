/**
 * Created by taranjeet.s on 1/20/2017.
 */
const Initial_State = { name : '',phone : "",shift:"",loading:false,error:"" };
export default (state = Initial_State,action) => {
    switch (action.type){
        case 'employee_update' :
            console.log("the payload is ",action.payload);
            return {...state,[action.payload.props]:action.payload.value,error:'' };
        case 'form_reset' :
            console.log("form is reset");
            return { ...state,name : '',phone : '',shift : '' };
        default :
            return state;
    }
};