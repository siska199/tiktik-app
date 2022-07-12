import { combineReducers } from "redux";
import postReducer from "./postReducer";
import categoryReducer  from './categoryReducer';

const reducers = combineReducers({
    post : postReducer,
    category : categoryReducer
})

export default reducers