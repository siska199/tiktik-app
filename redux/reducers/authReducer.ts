import { HANDLE_TOOLTIP_AUTH, HANDLE_GET_PROVIDERS_DATA } from '../actions-type/authAction';


const initialState = {
    tooltipAuth : false
}

const authReducer = (state=initialState, action:any)=>{
    switch(action.type){
        case HANDLE_TOOLTIP_AUTH:
            return{...state,tooltipAuth:action.payload}
        case HANDLE_GET_PROVIDERS_DATA:
            return{...state, providers:action.payload}
        default:
            return{...state}
    }
}

export default authReducer

