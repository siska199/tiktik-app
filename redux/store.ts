import {createStore, applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers"

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : typeof compose;
    }
}

let composeEnhancers : Function | any = compose
if(typeof window !=="undefined"){
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
    }) || compose
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))


export default store