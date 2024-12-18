import { get_access_token } from "../local-storage/access_token"
import update_token_middleware from "../middlewares/update_token_middleware"

export type fetchAPIData = {
    access_token: string, 
    updated: boolean,
    response: Response
}

export default function fetchAPI(fetch_func: (access_token: string) => Promise<Response>) : Promise<fetchAPIData> {
    let response_data : fetchAPIData = {
        access_token: "",
        updated: false,
        response: new Response()
    }

    return new Promise<fetchAPIData>((resolve) => {
        fetch_func(get_access_token())
            .then((response) => {
                console.log(response)
                return update_token_middleware(response)})
            .then((updated_token_data) => {
                response_data.access_token = updated_token_data.access_token
                response_data.updated = updated_token_data.updated
                return fetch_func(response_data.access_token)})
            .then((response) => {
                console.log(response)
                response_data.response = response
                return resolve(response_data)})
    })
} 