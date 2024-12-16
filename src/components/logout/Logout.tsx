import { LOGIN_PATH } from "../../constants/BrowserPathes"
import { useAppDispatch } from "../../app/hooks"
import { useNavigate } from "react-router"
import { send_log_out } from "../../reducers/UserSlice"

export default function Logout() {
    const dispath = useAppDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispath(send_log_out())
            .then(() => navigate(LOGIN_PATH))
    }

    return (
        <>
            <button onClick={logout}>
                Выйти
            </button>
        </>
    )
}