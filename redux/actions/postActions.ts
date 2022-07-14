import { HANDLE_MODAL_POST_DETAIL, HANDLE_ADD_POST } from "../actions-type/postTypeAction"
import client from "../../utils/sanity"

export const handleModalDetail:Function = (stateModal:boolean)=>{
    return({
        type : HANDLE_MODAL_POST_DETAIL,
        payload : stateModal
    })
}

export const handleAddPost:Function =(data)=>async(dispatch, getState)=>{
    try {
        data.video && await client.assets.upload('file', data.video,{
                contentType : data.video.type,
                filename: data.video.name
        })   

        const resAddPost = await fetch('api/post',{
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
        
        return({
            type: HANDLE_ADD_POST,
            payload : resAddPost
        })
    } catch (error) {
        throw error
    }

}
