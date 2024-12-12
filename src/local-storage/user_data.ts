import { UserType } from "../app/user_type"

const USER_DATA_NAME = "user_data"

export const save_userdata = (data: UserType) : void => {
    if (localStorage.getItem(USER_DATA_NAME)) {
        console.warn("userdata already exists in local storage")
        drop_userdata()
    }
    localStorage.setItem(USER_DATA_NAME, JSON.stringify(data))
}

export const get_userdata = () : UserType => {
    let userdata_json : UserType | null = null
    if (!localStorage.getItem(USER_DATA_NAME)) {
        console.warn("local storage not contain userdata")
    }
    else {
        userdata_json = JSON.parse(localStorage.getItem(USER_DATA_NAME) ?? "")
    }

    return {
        id: userdata_json?.id, 
        created_at: userdata_json?.created_at ?? null, 
        name: userdata_json?.name, 
        email: userdata_json?.email
    }
}

export const drop_userdata = () : void => {
    if (!localStorage.getItem(USER_DATA_NAME)) {
        console.warn("local storage not contain userdata")
    }
    else {
        localStorage.removeItem(USER_DATA_NAME)
    }
}