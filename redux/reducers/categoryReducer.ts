import { GET_CATEGORIES } from "../actions-type/categoryActions";


const initialState = {
    categories : []
}

const categoryReducer = (state=initialState,action:any)=>{
    switch(action.type){
        case GET_CATEGORIES:
            console.log("payload: ", action.payload)
            return{...state, categories:action.payload}
        default:
            return{...state}
    }

}

export default categoryReducer