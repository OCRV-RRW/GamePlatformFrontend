import { ApiForm, UploadPreviewForm } from "../../app/api_forms_interfaces";
import fetchAuthAPI from "../../app/fetchAPI";
import { set_request_options } from "../../app/set_request_options";
import { API_UPLOAD_PREVIEW_PATH } from "../../constants/ApiPathes";
import { BACKEND_DOMAIN } from "../../constants/Settings";

const fetch_upload_preview_response = (access_token: string, query_search?: string, body?: ApiForm) : Promise<Response> => {
    let requestBody : FormData = new FormData()
    console.log((body as UploadPreviewForm).preview_key)
    console.log((body as UploadPreviewForm).preview_value)
    requestBody.append((body as UploadPreviewForm).preview_key, (body as UploadPreviewForm).preview_value)
    return fetch(API_UPLOAD_PREVIEW_PATH + query_search, {method: "POST", body: requestBody, credentials: "include", headers: {
        'Access-Control-Allow-Origin' : BACKEND_DOMAIN,
        'Authorization': access_token ? 'Bearer ' + access_token : ""
    }})
} 

export function fetch_upload_preview(body: UploadPreviewForm, query_search: string) : Promise<{access_token: string, response: Response}> {
    return new Promise<{access_token: string, response: Response}>(
        (resolve, reject) => {
            fetchAuthAPI({fetch_func: fetch_upload_preview_response, body: body, query_search})
            .then(
                (fetch_api_data) => resolve({access_token: fetch_api_data.access_token, response: fetch_api_data.response}),
                (reason) => reject(reason)
            )
        }
    )
}