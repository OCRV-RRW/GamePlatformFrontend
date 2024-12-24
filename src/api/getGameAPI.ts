import fetchAPI from "../app/fetchAPI";
import { API_GET_GAME_PATH } from "../constants/ApiPathes";

const fetch_get_game_response = (access_token: string, query_search?: string) : Promise<Response> => fetch(API_GET_GAME_PATH + query_search,
    {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : 'https://ocrv-game.ru',
            'Authorization': 'Bearer ' + access_token
        }
    }
)

export function fetch_get_game(query_search: string) : Promise<{access_token: string, response: Response}> {
    return new Promise<{access_token: string, response: Response}>(
        (resolve) => {
            fetchAPI(fetch_get_game_response, query_search)
                .then((fetch_api_data) => {
                    return resolve({access_token: fetch_api_data.access_token, response: fetch_api_data.response})})
        }
    )
}