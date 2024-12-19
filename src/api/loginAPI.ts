import { API_USER_ME_PATH, API_LOGIN_PATH } from "../constants/ApiPathes";
import { LoginForm } from "../app/api_forms_types";
import { UserType } from "../app/user_type";

const parseErrors = (error_data: object) => {

}

export function fetch_log_in(login_form: LoginForm) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(login_form)
    }

    let access_token: string = ""
    let parsed_error_message: string = ""
    
    return new Promise<{ access_token: string, user_data: UserType }>(
        (resolve, reject: (reason: string) => void) => {
            fetch(API_LOGIN_PATH, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin' : 'https://ocrv-game.ru'
                },
                body: JSON.stringify(login_form)
            })
            .then((response) => {
                return response.json()
            })
            .then((response_data) => {
                console.log(response_data)
                access_token = response_data?.data?.access_token
                return get_user_data_by_token(access_token)
            })
            .then((user_data) => parsed_error_message === "" 
                ? resolve( { access_token: access_token, user_data: user_data.user_data } ) 
                : reject(parsed_error_message))
        }
    );
}

export function get_user_data_by_token(access_token: string) : Promise<{ user_data: UserType }> {
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + access_token
        }
    }

    return new Promise<{ user_data: UserType}>(
        (resolve) => {
            fetch(API_USER_ME_PATH, requestOptions)
            .then((response) => response.json())
            .then((response_data) => resolve( { user_data: response_data?.data?.user } ))
        }
    )
}