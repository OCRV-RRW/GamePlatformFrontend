import { BACKEND_DOMAIN } from "../constants/Settings"
import { ApiForm } from "./api_forms_interfaces"

interface RequestOptionsParams {
    method: RequestOptionsMethod, 
    access_token? : string, 
    body_form?: ApiForm | FormData
}

type RequestOptionsMethod = 
    "GET" 
    | "POST" 
    | "DELETE" 
    | "PATCH"

export const set_request_options = (params: RequestOptionsParams, isFormDataContent: boolean = false) => {
    console.log(params.body_form)
    const options = params.body_form ? {
        method: params.method,
        credentials: ("include" as RequestCredentials),
        headers: {
            'Content-type': !isFormDataContent ? 'application/json; charset=UTF-8': 'multipart/form-data',
            'Access-Control-Allow-Origin' : BACKEND_DOMAIN,
            'Authorization': params.access_token ? 'Bearer ' + params.access_token : ""
        },
        body: isFormDataContent ? <FormData>params.body_form : JSON.stringify(params.body_form)
    } : {
        method: params.method,
        credentials: ("include" as RequestCredentials),
        headers: {
            'Content-type':  !isFormDataContent ? 'application/json; charset=UTF-8': 'multipart/form-data',
            'Access-Control-Allow-Origin' : BACKEND_DOMAIN,
            'Authorization': params.access_token ? 'Bearer ' + params.access_token : ""
        }
    }
    return options
}

