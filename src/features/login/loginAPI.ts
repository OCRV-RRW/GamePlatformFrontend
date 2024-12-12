import { API_GET_ME_PATH, API_LOGIN_PATH } from "../../app/ApiPathes";
import { LoginForm } from "../../app/forms_types";
import { UserType } from "../../app/user_type";

export function fetch_log_in(login_form: LoginForm) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(login_form)
    }

    let access_token: string = ""
    
    return new Promise<{ access_token: string, user_data: UserType }>(
        (resolve) => {
            fetch(API_LOGIN_PATH, requestOptions)
            .then((response) => response.json())
            .then((response_data) => {
                access_token = response_data.access_token
                return get_user_data_by_token(access_token)
            })
            .then((user_data) => resolve( { access_token: access_token, user_data: user_data.user_data } ))
        }
    );
}

function get_user_data_by_token(access_token: string) : Promise<{ user_data: UserType }> {
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + access_token
        }
    }

    return new Promise<{ user_data: UserType}>(
        (resolve) => {
            fetch(API_GET_ME_PATH, requestOptions)
            .then((response) => response.json())
            .then((response_data) => resolve( { user_data: response_data?.data?.user } ))
        }
    )
}