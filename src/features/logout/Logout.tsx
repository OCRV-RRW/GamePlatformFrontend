import { useNavigate } from "react-router"
import { LOGIN_PATH } from "../../app/BrowserPathes"
import { send_logout } from "./logoutAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { log_out, selectAccessToken } from "../user/UserSlice"

export default function Logout() {
    const navigate = useNavigate()
    const dispath = useAppDispatch()
    const access_token = useAppSelector(selectAccessToken)

    const logout = () => {
        dispath(log_out())
        navigate(LOGIN_PATH)
        // send_logout(access_token).then(() => {
        //     dispath(log_out())
        //     navigate(LOGIN_PATH)
        // })
    }

    return (
        <>
            <button onClick={logout}>
                Выйти
            </button>
        </>
    )
}