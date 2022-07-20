import {Action, ActionCreator, Dispatch} from 'redux';
import { HANDLE_ADD_COMMENT, HANDLE_MODAL_POST_DETAIL, HANDLE_ADD_POST, HANDLE_GET_POST, HANDLE_ADD_REMOVE_LOVE } from './../actions-type/postTypeAction';
import client from "../../utils/sanityClient/sanity"

export const handleModalDetail:Function = (stateModal:boolean)=>{
    return({
        type : HANDLE_MODAL_POST_DETAIL,
        payload : stateModal
    })
}

export const handleAddPost:Function =(data)=>async(dispatch, getState)=>{
    try {
        const videoUploadInfo = await client.assets.upload('file', data.video,{
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
        
        return dispatch({
            type: HANDLE_ADD_POST,
            payload : resAddPost
        })
    } catch (error) {
        throw error
    }

}

export const handleGetPost:Function = (id:string) => async(dispatch, getState)=>{
    try {
        const post = await fetch(`api/post/${id}`).then(res=>res.json())
        return dispatch({
            type : HANDLE_GET_POST,
            payload : post
        })
    } catch (error) {
        throw error
    }
}

export const handleAddComment: Function = (data)=>async(dispatch, getState)=>{
    try {    
        const resAddComment = await fetch(`api/post/${data.idPost}/comment`,{
            method:"POST",
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({comment:data.comment})
        })
        return dispatch({
            type : HANDLE_ADD_COMMENT,
            payload : resAddComment,
        })
    } catch (error) {
        throw error
    }
}


export const handleAddRemoveLove : Function = (data)=>async(dispatch, getState)=>{
    try {
        const resLike = await fetch(`api/post/${data.idPost}/love`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                like : data.like
            })
        })
        return dispatch({
            type : HANDLE_ADD_REMOVE_LOVE,
            payload : resLike
        })
    } catch (error) {
        throw error
    }
}