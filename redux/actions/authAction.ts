import { HANDLE_GET_PROVIDERS_DATA, HANDLE_TOOLTIP_AUTH } from './../actions-type/authAction';

export const handleTooltipAuth = (state) => {
    return({
        type:HANDLE_TOOLTIP_AUTH,
        payload :state
    })
}

export const handleGetProviders = (providers)=>{
    return({
        type: HANDLE_GET_PROVIDERS_DATA,
        payload : providers
    })
}