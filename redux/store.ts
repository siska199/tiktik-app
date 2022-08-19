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

export type AppDispatch = typeof store.dispatch; // Here we export the store's dispatch type
export type RootState = ReturnType<typeof store.getState>; // Here we export the store's state

export default store