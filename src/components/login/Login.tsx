import { useState } from "react"
import { LoginForm } from "../../app/api_forms_types";
import { useAppDispatch } from "../../app/hooks";
import { send_log_in_form } from "../../reducers/UserSlice";
import { FORGOT_PASSWORD_PATH, REGISTER_PATH } from "../../constants/BrowserPathes";
import { useNavigate } from "react-router";

export default function Login() : JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    let login_form : LoginForm = {
        email: email,
        password: password
    }

    function on_login() {
        dispatch(send_log_in_form(login_form))
    }

    const onChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (<>
        <form id="login">
            <h1>ЛОГИН</h1>
            <div className="email">
                <h3>Электронная почта:</h3>
                <input 
                    name="emailInput"
                    value={email}
                    onChange={onChangeEmail}>
                </input>
            </div>
            <div className="password">
                <h3>Пароль:</h3>
                <input 
                    name="passwordInput"
                    value={password}
                    onChange={onPasswordChange}>
                </input>
            </div>
        </form>
        <div className="buttons">
            <button  disabled={email.length === 0 || password.length === 0} className="login_button" 
                name="log_in_button"
                onClick={on_login}>
                    Войти
            </button>
            <button className="login_button" 
                name="register_button"
                onClick={() => navigate(REGISTER_PATH)}>
                    Зарегистрироваться
            </button>
            <button className="login_button" 
                name="forgot_password_button"
                onClick={() => navigate(FORGOT_PASSWORD_PATH)}>
                    Забыл пароль
            </button>
        </div>
        <h1>Спасибо что пользуетесь играми ОЦРВ!!</h1>
    </>)
}