import { API_LOGOUT_PATH } from "../../app/ApiPathes"

export function send_logout(access_token: string) : Promise<void> {
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return new Promise<void>(
        (resolve, reject: (reason: string) => void) => {
            fetch(API_LOGOUT_PATH, requestOptions)
                .then((response) => response.ok ? resolve() : reject("invalid request"))
        }
    )
}