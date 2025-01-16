import { ForgotPasswordForm } from "../app/api_forms_interfaces"
import { set_request_options } from "../app/set_request_options"
import { API_FORGOT_PASSWORD_PATH } from "../constants/ApiPathes"

export function fetch_forgot_password(forgot_password_form: ForgotPasswordForm) : Promise<void> {
    return new Promise<void> ((resolve, reject) => {
        fetch(API_FORGOT_PASSWORD_PATH, set_request_options({method: "POST", body_form: forgot_password_form}))
            .then((response) => response.ok ? resolve() : reject("invalid request"))
    })
}