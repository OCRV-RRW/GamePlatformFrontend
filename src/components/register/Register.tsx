import { useState } from "react"
import { fetch_register } from "../../api/registerAPI"
import { RegisterForm } from "../../app/api_forms_types"
import ReturnToLoginButton from "../login/ReturnToLoginButton"

export default function Register() {
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    const [registrationState, setRegistrationState] = useState<string>("")

    let register_form: RegisterForm = {
        name: username,
        email: email,
        password: password,
        password_confirm: passwordConfirm
    }

    async function send_registration_data(register_form: RegisterForm) {
        await fetch_register(register_form)
            .then(
                () => setRegistrationState("Перейди на почту"), 
                (reason) => {
                    console.log(reason)
                    setRegistrationState("Проверь правильность введенных данных")
                }
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
                <ReturnToLoginButton />
            </div>
            <h1>{registrationState}</h1>
        </>
    )
} 