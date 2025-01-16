import { API_REGISTER_PATH } from "../../src/constants/ApiPathes"
import { RegisterForm } from "../app/api_forms_interfaces"
import { set_request_options } from "../app/set_request_options"

export function fetch_register(register_form: RegisterForm) : Promise<void> {
    return new Promise<void>(
        (resolve, reject: (reason: string) => void) => {
            fetch(API_REGISTER_PATH, set_request_options({method: "POST", body_form: register_form}))
            .then((response) => response.ok ? resolve() : reject("invalid request"))
        }
    )
}