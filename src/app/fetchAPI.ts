import { get_access_token } from "../local-storage/access_token"
import update_token_middleware from "../middlewares/update_token_middleware"
import { ApiForm } from "./api_forms_interfaces"

export type fetchAPIData = {
    access_token: string, 
    updated: boolean,
    response: Response
}

interface FetchAPIParams {
    fetch_func: (access_token: string, query_search?: string, body?: ApiForm) => Promise<Response>,
    query_search?: string,
    body?: ApiForm
}

export default function fetchAuthAPI(params: FetchAPIParams) 
    : Promise<fetchAPIData> {
    let response_data : fetchAPIData = {
        access_token: "",
        updated: false,
        response: new Response()
    }
    let afterFirstQueryResponse = new Response()
    return new Promise<fetchAPIData>((resolve) => {
        params.fetch_func(get_access_token(), params.query_search, params.body)
            .then((response) => {
                afterFirstQueryResponse = response
                return update_token_middleware(response)})
            .then((updated_token_data) => {
                response_data.access_token = updated_token_data.access_token
                response_data.updated = updated_token_data.updated
                if (!response_data.updated) {
                    response_data.response = afterFirstQueryResponse
                    return resolve(response_data)
                }
                else {
                    return params.fetch_func(response_data.access_token, params.query_search, params.body)
                        .then((response) => {
                            response_data.response = response
                            return resolve(response_data)
                        })
                }
            })
    })
} 