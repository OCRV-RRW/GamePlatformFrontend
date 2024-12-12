import { API_REGISTER_PATH } from "../../app/ApiPathes"
import { RegisterForm } from "../../app/forms_types"

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
            fetch(API_REGISTER_PATH, requestOptions)
            .then((response) => response.ok ? resolve() : reject("invalid request"))
        }
    )
}