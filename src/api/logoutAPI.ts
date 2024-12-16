import { API_LOGOUT_PATH } from "../constants/ApiPathes"

export function fetch_log_out() : Promise<void> {
    return new Promise<void>(
        (resolve, reject: (reason: string) => void) => {
            fetch(API_LOGOUT_PATH,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin' : 'https://ocrv-game.ru'
                }
            }
            )
            .then((response) => response.ok ? resolve() : reject("invalid request"))
        }
    )
}