import fetchAuthAPI from "../app/fetchAPI"
import { set_request_options } from "../app/set_request_options"
import { API_LOGOUT_PATH } from "../constants/ApiPathes"

const fetch_log_out_response = (access_token: string) : Promise<Response> => fetch(API_LOGOUT_PATH,
    set_request_options({method: "GET"})
)

export function fetch_log_out() : Promise<{access_token: string}> {
    return new Promise<{access_token: string}>(
        (resolve) => {
            fetchAuthAPI(fetch_log_out_response)
                .then((fetch_api_data) => {
                    console.log(fetch_api_data)
                    return resolve({access_token: fetch_api_data.access_token})})
        }
    )
}