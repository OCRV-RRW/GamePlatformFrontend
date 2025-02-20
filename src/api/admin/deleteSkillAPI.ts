import fetchAuthAPI from "../../app/fetchAPI";
import { set_request_options } from "../../app/set_request_options";
import { API_DELETE_SKILL } from "../../constants/ApiPathes";

const fetch_delete_skill_response = (access_token: string, query_search?: string) : Promise<Response> => 
    fetch(API_DELETE_SKILL + query_search, set_request_options({method: 'DELETE', access_token: access_token})
)

export function fetch_delete_skill(query_search: string) : Promise<{access_token: string, response: Response}> {
    return new Promise<{access_token: string, response: Response}>(
        (resolve, reject) => {
            fetchAuthAPI({fetch_func: fetch_delete_skill_response, query_search})
                .then(
                    (fetch_api_data) => resolve({access_token: fetch_api_data.access_token, response: fetch_api_data.response}),
                    (reason) => reject(reason)
                )
        }
    )
}