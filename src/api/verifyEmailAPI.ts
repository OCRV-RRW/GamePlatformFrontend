import { API_VERIFY_REGISTER_EMAIL } from "../constants/ApiPathes"

export function fetch_verify_email(id: string) : Promise<void> {

    return new Promise<void>(
        (resolve, reject) => {
            fetch(API_VERIFY_REGISTER_EMAIL, {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Access-Control-Allow-Origin' : 'https://ocrv-game.ru'
                            }
                        }
                ).then((response) => console.log(response))
        })
}