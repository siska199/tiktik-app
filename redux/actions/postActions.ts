import { HANDLE_MODAL_POST_DETAIL, HANDLE_ADD_POST } from "../actions-type/postTypeAction"
import client from "../../utils/sanity"

export const handleModalDetail:Function = (stateModal:boolean)=>{
    return({
        type : HANDLE_MODAL_POST_DETAIL,
        payload : stateModal
    })
}

export const handleAddPost =(data)=>async(dispatch, getState)=>{
    console.log("form: ", data)
    const videoUploadInfo = await client.assets.upload('file', data.video,{
        contentType : data.video.type,
        filename: data.video.name
    })
    console.log("upload video: ", videoUploadInfo)
    const res = await fetch('api/post',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            ...data,
            video : {
                _id :videoUploadInfo._id
            }
        })
    })

    console.log("res add post: ", res)
    return({
        type: HANDLE_ADD_POST,
        payload : ""
    })
}
