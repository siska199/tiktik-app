import { HANDLE_ADD_COMMENT, HANDLE_MODAL_POST_DETAIL, HANDLE_ADD_POST, HANDLE_GET_POST, HANDLE_ADD_REMOVE_LOVE, HANDLE_ADD_REMOVE_BOOKMARK, HANDLE_GET_POSTS, HANDLE_LOADING_POST } from './../actions-type/postTypeAction';
import client from "../../utils/sanityClient/sanity"

export const handleModalDetail:Function = (stateModal:boolean)=>{
    return({
        type : HANDLE_MODAL_POST_DETAIL,
        payload : stateModal
    })
}

export const handleGetPosts: Function = (data:{type:string;_idUser:string})=>async(dispatch:any, getState:any)=>{
    try {
        const resPosts = await fetch(`/api/post?type=${data.type}&&_idUser=${data._idUser}`).then(res=>res.json())
        return dispatch({
            type : HANDLE_GET_POSTS,
            payload : resPosts
        })
    } catch (error) {
        throw error
    }
}

export const handleAddPost:Function =(data:{video:any})=>async(dispatch:any, getState:any)=>{
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

export const handleGetPost:Function = (id:string) => async(dispatch:any, getState:any)=>{
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

export const handleAddComment: Function = (data:{idPost:string;comment:string;})=>async(dispatch:any, getState:any)=>{
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

export const handleAddRemoveLove : Function = (data:{idPost:string;likeKeyUser:string})=>async(dispatch:any, getState:any)=>{
    try {
        const resLike = await fetch(`api/post/${data.idPost}/love`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                likeKeyUser : data.likeKeyUser
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

export const handleAddRemoveBookmark:Function = (data:{idPost:string;bookmarkKeyUser:string})=>async(dispatch:any, getState:any)=>{
    try {
        const resBookmark = await fetch(`api/post/${data.idPost}/bookmark`,{
            method : "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                bookmarkKeyUser : data.bookmarkKeyUser 
            })
        })
        return dispatch({
            type : HANDLE_ADD_REMOVE_BOOKMARK,
            payload : resBookmark
        })
    } catch (error) {
        throw error
    }
}


export const handleLoadingPost:Function = (loadingState:boolean)=>{
    return({
        type: HANDLE_LOADING_POST,
        payload : loadingState
    })
}