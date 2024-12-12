import { useState } from "react"
import { LoginForm } from "../../app/forms_types";
import { useAppDispatch } from "../../app/hooks";
import { send_log_in_form } from "../user/UserSlice";
import { useNavigate } from "react-router";
import { FORGOT_PASSWORD_PATH, HOME_PATH, REGISTER_PATH } from "../../app/BrowserPathes";


export default function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    let login_form : LoginForm = {
        email: email,
        password: password
    }

     function on_login() {
        dispatch(send_log_in_form(login_form))
    }

    return (<>
        <form id="login">
            <h1>ЛОГИН</h1>
            <div className="email">
                <h3>Электронная почта:</h3>
                <input 
                    name="emailInput"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}>
                </input>
            </div>
            <div className="password">
                <h3>Пароль:</h3>
                <input 
                    name="passwordInput"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}>
                </input>
            </div>
        </form>
        <div className="buttons">
            <button  disabled={email.length == 0 || password.length == 0} className="login_button" 
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