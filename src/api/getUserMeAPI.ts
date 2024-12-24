import fetchAPI from "../app/fetchAPI";
import { User } from "../app/user_type";
import { API_USER_ME_PATH } from "../constants/ApiPathes";

const fetch_user_me_response = (access_token: string) : Promise<Response> => fetch(API_USER_ME_PATH, {
    method: "GET",
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + access_token
    }
})

export function fetch_user_me() : Promise<{access_token: string, user_data: User | null}> {
    let response_access_token = ""
    return new Promise<{access_token: string, user_data: User | null}>((resolve) => {
        fetchAPI(fetch_user_me_response)
            .then((fetch_api_data) => {
                response_access_token = fetch_api_data.access_token
                return fetch_api_data.response.json()})
            .then((response_data) => {
                return resolve({access_token: response_access_token, user_data: response_data?.data?.user})
        })
    })
}



