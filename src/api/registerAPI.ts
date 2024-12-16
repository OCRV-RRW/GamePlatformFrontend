import { API_REGISTER_PATH } from "../../src/constants/ApiPathes"
import { RegisterForm } from "../../src/app/api_forms_types"

export function fetch_register(register_form: RegisterForm) : Promise<void> {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(register_form)
    }

    return new Promise<void>(
        (resolve, reject: (reason: string) => void) => {
            fetch(API_REGISTER_PATH, {method: "POST",
                credentials: "include",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin' : 'https://ocrv-game.ru'
                },
                body: JSON.stringify(register_form)})
            .then((response) => response.ok ? resolve() : reject("invalid request"))
        }
    )
}