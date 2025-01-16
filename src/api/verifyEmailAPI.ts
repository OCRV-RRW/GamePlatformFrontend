import { set_request_options } from "../app/set_request_options"
import { API_VERIFY_REGISTER_EMAIL } from "../constants/ApiPathes"

export function fetch_verify_email(id: string) : Promise<void> {

    return new Promise<void>(
        (resolve, reject) => {
            fetch(API_VERIFY_REGISTER_EMAIL + id, set_request_options({method: "POST"})
                )
                .then((response) => response.ok ? resolve() : reject(response.status))
        })
}