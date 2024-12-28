import { ResetPasswordForm } from "../app/api_forms_types"
import { API_RESET_PASWORD_PATH } from "../constants/ApiPathes"

export function fetch_reset_password(reset_password_form: ResetPasswordForm, reset_code: string) : Promise<void> {
    return new Promise<void> ((resolve, reject) => {
        fetch(API_RESET_PASWORD_PATH + reset_code, {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Access-Control-Allow-Origin' : 'https://ocrv-game.ru'
                    }, 
                    body: JSON.stringify(reset_password_form)
                }
            )
            .then((response) => response.ok ? resolve() : reject(response.status))
    })
}