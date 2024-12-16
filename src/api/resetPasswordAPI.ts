import { ResetPasswordForm } from "../app/api_forms_types"
import { API_RESET_PASWORD_PATH } from "../constants/ApiPathes"

export function fetch_reset_password(reset_password_form: ResetPasswordForm, reset_code: string) : Promise<void> {
    const requestOptions = {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(reset_password_form)
    }

    return new Promise<void> ((resolve, reject) => {
        fetch(API_RESET_PASWORD_PATH + reset_code, requestOptions)
            .then((response) => response.ok ? resolve() : reject("invalid request"))
    })
}