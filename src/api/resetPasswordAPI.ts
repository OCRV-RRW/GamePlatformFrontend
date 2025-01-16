import { ResetPasswordForm } from "../app/api_forms_interfaces"
import { set_request_options } from "../app/set_request_options"
import { API_RESET_PASWORD_PATH } from "../constants/ApiPathes"

export function fetch_reset_password(reset_password_form: ResetPasswordForm, reset_code: string) : Promise<void> {
    return new Promise<void> ((resolve, reject) => {
        fetch(API_RESET_PASWORD_PATH + reset_code, 
                set_request_options({method: "PATCH", body_form: reset_password_form})
            )
            .then((response) => response.ok ? resolve() : reject(response.status))
    })
}