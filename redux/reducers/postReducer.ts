import { HANDLE_MODAL_DETAIL } from "../actions-type/postTypeAction"

const initialState = {
    modalDetail : false
}

export const postReducer = (state=initialState, action:any)=>{
    switch(action.type){
        case HANDLE_MODAL_DETAIL:
            console.log("modal detail: ", action.payload)
         return {...state, modalDetail: action.payload}
        case "":
         return {...state}
        default:
            return{...state}
    }

}

export default postReducer