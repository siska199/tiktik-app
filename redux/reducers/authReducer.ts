import { HANDLE_MODAL_AUTH, HANDLE_GET_PROVIDERS_DATA } from '../actions-type/authAction';


const initialState = {
    modalAuth : false
}

const authReducer = (state=initialState, action:any)=>{
    switch(action.type){
        case HANDLE_MODAL_AUTH:
            return{...state,modalAuth:!state.modalAuth}
        case HANDLE_GET_PROVIDERS_DATA:
            return{...state, providers:action.payload}
        default:
            return{...state}
    }
}

export default authReducer

