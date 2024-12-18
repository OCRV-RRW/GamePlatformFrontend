import fetchAPI from "../app/fetchAPI"
import { API_LOGOUT_PATH } from "../constants/ApiPathes"

const fetch_log_out_response = (access_token: string) : Promise<Response> => fetch(API_LOGOUT_PATH,
    {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : 'https://ocrv-game.ru',
        }
    }
)

export function fetch_log_out() : Promise<{access_token: string}> {
    return new Promise<{access_token: string}>(
        (resolve) => {
            fetchAPI(fetch_log_out_response)
                .then((fetch_api_data) => {
                    console.log(fetch_api_data)
                    return resolve({access_token: fetch_api_data.access_token})})
        }
    )
}