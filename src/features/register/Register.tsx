import { useState } from "react"
import { useNavigate } from "react-router"
import { fetch_register } from "./registerAPI"
import { RegisterForm } from "../../app/forms_types"
import { LOGIN_PATH } from "../../app/BrowserPathes"

export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    const [sendRegistrationFormState, setSendRegistrationFormState] = useState<boolean>(false)

    let register_form: RegisterForm = {
        name: username,
        email: email,
        password: password,
        password_confirm: passwordConfirm
    }

    async function send_registration_data(register_form: RegisterForm) {
        await fetch_register(register_form)
            .then(
                () => setSendRegistrationFormState(true), 
                (reason) => console.log(reason)
            )
    }

    const register = () => {
        send_registration_data(register_form)
    }

    return(
        <>
            <form id="register">
            <h1>Регистрация</h1>
            <div className="username">
                <h3>Имя пользователя:</h3>
                <input 
                    name="usernameInput"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}>
                </input>
            </div>
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
            <div className="confirmPassword">
                <h3>Повтори пароль:</h3>
                <input 
                    name="confirmPasswordInput"
                    value={passwordConfirm}
                    onChange={(event) => setPasswordConfirm(event.target.value)}>
                </input>
            </div>
            </form>
            <div className="buttons">
                <button className="register_button" 
                    name="register_button"
                    onClick={register}>
                        Зарегистрироваться
                </button>
                <button className="register_button" 
                    name="back_to_login"
                    onClick={() => {navigate(LOGIN_PATH)}}>
                        Вернуться к логину
                </button>
            </div>
            <h1>{sendRegistrationFormState && "Перейди на почту"}</h1>
        </>
    )
} 