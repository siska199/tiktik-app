import { HANDLE_MODAL_POST_DETAIL, HANDLE_ADD_POST } from "../actions-type/postTypeAction"

const initialState = {
    modalDetail : false
}

export const postReducer = (state=initialState, action:any)=>{
    switch(action.type){
        case HANDLE_MODAL_POST_DETAIL:
         return {...state, modalDetail: action.payload}
        case HANDLE_ADD_POST:
         return {...state}
        default:
            return{...state}
    }

}

export default postReducer