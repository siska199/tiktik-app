import { HANDLE_MODAL_POST_DETAIL, HANDLE_ADD_POST } from "../actions-type/postTypeAction"

export const handleModalDetail:Function = (stateModal:boolean)=>{
    return({
        type : HANDLE_MODAL_POST_DETAIL,
        payload : stateModal
    })
}

export const handleAddPost =(data)=>async(dispatch, getState)=>{
    console.log("data masuk action: ", data)
    const formData = new FormData()

    Object.keys(data).forEach(key=>{
        formData.append(key, data[key])
    })

    const res = await fetch('api/post',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body : formData
    })
    console.log("res add post: ", res)
    return({
        type: HANDLE_ADD_POST,
        payload : ""
    })
}
