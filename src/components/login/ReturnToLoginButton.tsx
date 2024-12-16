import { useNavigate } from "react-router"
import { LOGIN_PATH } from "../../constants/BrowserPathes"

export default function ReturnToLoginButton() {
    const navigate = useNavigate()

    return (
        <>
            <button className="register_button" 
                name="back_to_login"
                onClick={() => navigate(LOGIN_PATH)}>
                    Вернуться к логину
            </button>
        </>
    )
}