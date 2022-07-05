import { HANDLE_MODAL_DETAIL } from "../actions-type/postTypeAction"

export const handleModalDetail:Function = (stateModal:boolean)=>{
    return({
        type : HANDLE_MODAL_DETAIL,
        payload : stateModal
    })
}

