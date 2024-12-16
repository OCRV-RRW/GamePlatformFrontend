import { ForgotPasswordForm } from "../app/api_forms_types"
import { API_FORGOT_PASSWORD_PATH } from "../constants/ApiPathes"

export function fetch_forgot_password(forgot_password_form: ForgotPasswordForm) : Promise<void> {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(forgot_password_form)
    }

    return new Promise<void> ((resolve, reject) => {
        fetch(API_FORGOT_PASSWORD_PATH, requestOptions)
            .then((response) => response.ok ? resolve() : reject("invalid request"))
    })
}