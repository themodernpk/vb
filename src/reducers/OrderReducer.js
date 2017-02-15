/**
 * Created by taranjeet.s on 1/25/2017.
 */
const Initial_State = { amount : '',mobile : "",sku :"",type:'',date:'',loading:false,error:"",mobile_property:'' };
export default (state = Initial_State,action) => {
    switch (action.type){
        case 'mobile_property':
            return { ...state,mobile_property:action.payload };
        case 'order_added' :
            return { ...state,amount : '',mobile : '',sku:'',date : '',type:'',loading : false };
        case 'orderUpdate' :
            return {...state,[action.payload.props]:action.payload.value,error:'',loading : false };
        case 'order_loading':
            return { ...state,loading : true };
        case 'order_error' :
            console.log("hter is order error",action.payload);
            return { ...state,error : action.payload,loading:false };
        default :
            return state;
    }
};