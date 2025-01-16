import fetchAuthAPI from "../app/fetchAPI";
import { set_request_options } from "../app/set_request_options";
import { API_GET_GAME_PATH } from "../constants/ApiPathes";

const fetch_get_game_response = (access_token: string, query_search?: string) : Promise<Response> => 
    fetch(API_GET_GAME_PATH + query_search, set_request_options({method: "GET", access_token: access_token})
)

export function fetch_get_game(query_search: string) : Promise<{access_token: string, response: Response}> {
    return new Promise<{access_token: string, response: Response}>(
        (resolve) => {
            fetchAuthAPI(fetch_get_game_response, query_search)
                .then((fetch_api_data) => {
                    return resolve({access_token: fetch_api_data.access_token, response: fetch_api_data.response})})
        }
    )
}