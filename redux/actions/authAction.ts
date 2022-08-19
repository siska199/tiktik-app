import { HANDLE_GET_PROVIDERS_DATA, HANDLE_TOOLTIP_AUTH } from './../actions-type/authAction';

export const handleTooltipAuth = (state:any) => {
    return({
        type:HANDLE_TOOLTIP_AUTH,
        payload :state
    })
}

export const handleGetProviders = (providers:any)=>{
    return({
        type: HANDLE_GET_PROVIDERS_DATA,
        payload : providers
    })
}