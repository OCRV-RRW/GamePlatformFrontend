import { BACKEND_DOMAIN } from "../constants/Settings"
import { ApiForm } from "./api_forms_interfaces"

interface RequestOptionsParams {
    method: RequestOptionsMethod, 
    access_token? : string, 
    body_form?: ApiForm
}

type RequestOptionsMethod = 
    "GET" 
    | "POST" 
    | "DELETE" 
    | "PATCH"

export const set_request_options = (params: RequestOptionsParams) => {
    const options = params.body_form ? {
        method: params.method,
        credentials: ("include" as RequestCredentials),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : BACKEND_DOMAIN,
            'Authorization': params.access_token ? 'Bearer ' + params.access_token : ""
        },
        body: JSON.stringify(params.body_form)
    } : {
        method: params.method,
        credentials: ("include" as RequestCredentials),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : BACKEND_DOMAIN,
            'Authorization': params.access_token ? 'Bearer ' + params.access_token : ""
        }
    }
    return options
}

