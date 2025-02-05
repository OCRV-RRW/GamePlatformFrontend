import { API_USER_ME_PATH, API_LOGIN_PATH } from "../constants/ApiPathes";
import { LoginForm } from "../app/api_forms_interfaces";
import { User } from "../app/user_type";
import { set_request_options } from "../app/set_request_options";

export function fetch_log_in(login_form: LoginForm) {
    let access_token: string = ""
    let parsed_error_message: string = ""
    let expired_in: Date = new Date()
    
    return new Promise<{ access_token: string, user_data: User, expired_in: Date }>(
        (resolve, reject: (reason: string) => void) => {
            fetch(API_LOGIN_PATH, set_request_options({method: "POST", body_form: login_form}))
            .then((response) => {
                return response.json()
            })
            .then((response_data) => {
                console.log(response_data)
                access_token = response_data?.data?.access_token
                expired_in = response_data?.data?.expired_in
                return get_user_data_by_token(access_token)
            })
            .then((user_data) => parsed_error_message === "" 
                ? resolve( { access_token: access_token, user_data: user_data.user_data, expired_in: expired_in } ) 
                : reject(parsed_error_message))
        }
    );
}

export function get_user_data_by_token(access_token: string) : Promise<{ user_data: User }> {
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + access_token
        }
    }

    return new Promise<{ user_data: User}>(
        (resolve) => {
            fetch(API_USER_ME_PATH, requestOptions)
            .then((response) => response.json())
            .then((response_data) => resolve( { user_data: response_data?.data?.user } ))
        }
    )
}