import { HANDLE_GET_PROVIDERS_DATA, HANDLE_MODAL_AUTH } from './../actions-type/authAction';

export const handleModalAuth = () => {
    return({
        type:HANDLE_MODAL_AUTH,
        payload :""
    })
}

export const handleGetProviders = (providers)=>{
    return({
        type: HANDLE_GET_PROVIDERS_DATA,
        payload : providers
    })
}