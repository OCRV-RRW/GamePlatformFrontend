const EXPIRED_IN_NAME = "expired_in"

export const save_expired_in = (expired_in: string) : void => {
    if (localStorage.getItem(EXPIRED_IN_NAME)) {
        console.warn("expired_id already exists in local storage")
        drop_expired_in()
    }
    localStorage.setItem(EXPIRED_IN_NAME, expired_in)
}

export const get_expired_in = () : string => {
    let expired_in: string = ""
    if (!localStorage.getItem(EXPIRED_IN_NAME)) {
        console.warn("local storage not contain expired_in")
    }
    else {
        expired_in = localStorage.getItem(EXPIRED_IN_NAME) ?? ""
    }

    return expired_in
}

export const drop_expired_in = () : void => {
    if (!localStorage.getItem(EXPIRED_IN_NAME)) {
        console.warn("local storage not contain expired_in")
    }
    else {
        localStorage.removeItem(EXPIRED_IN_NAME)
    }
}

export const rewrite_expired_in = (expired_in: string) : void => {
    drop_expired_in()
    save_expired_in(expired_in)
}