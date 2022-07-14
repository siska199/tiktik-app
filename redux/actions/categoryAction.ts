import { GET_CATEGORIES } from "../actions-type/categoryActions"

export const handleGetCategories = ()=>async(dispatch:any)=>{
    const categories = await fetch(`api/category`).then(res=>res.json())
    return dispatch({
        type:GET_CATEGORIES,
        payload :categories
    })
}