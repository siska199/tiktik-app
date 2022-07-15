import { HANDLE_ADD_COMMENT, HANDLE_MODAL_POST_DETAIL, HANDLE_ADD_POST, HANDLE_GET_POST } from './../actions-type/postTypeAction';

const initialState = {
    modalDetail : false,
    post : {}
}

export const postReducer = (state=initialState, action:any)=>{
    switch(action.type){
        case HANDLE_MODAL_POST_DETAIL:
         if(!action.payload) state.post = {}
         return {...state, modalDetail: action.payload,}
        case HANDLE_ADD_POST:
         return {...state}
        case HANDLE_GET_POST:
            return{...state, post:action.payload}
        case HANDLE_ADD_COMMENT:
            return{...state}
        default:
            return{...state}
    }

}

export default postReducer