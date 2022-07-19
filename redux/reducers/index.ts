import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import categoryReducer  from './categoryReducer';

const reducers = combineReducers({
    auth : authReducer,
    post : postReducer,
    category : categoryReducer
})

export default reducers