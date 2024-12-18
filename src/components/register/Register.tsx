import { useState } from "react"
import { fetch_register } from "../../api/registerAPI"
import { RegisterForm } from "../../app/api_forms_types"
import ReturnToLoginButton from "../login/ReturnToLoginButton"
import { ValidState } from "../../app/valid_state"
import EmailValidate from "../../validate/email_validate"
import PasswordValidate from "../../validate/password_validate"

export default function Register() {
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    const [registrationState, setRegistrationState] = useState<string>("")
    const [emailValidState, setEmailValidState] = useState<ValidState>(ValidState.None)
    const [passwordValidState, setPasswordValidState] = useState<ValidState>(ValidState.None)

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
    console.log("render register form")
    
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        if (event.target.value === "")
            setEmailValidState(ValidState.None)
        else
            setEmailValidState(EmailValidate(event.target.value) ? ValidState.Valid : ValidState.Invalid)
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        if (event.target.value === "")
            setPasswordValidState(ValidState.None)
        else
            setPasswordValidState(PasswordValidate(event.target.value) ? ValidState.Valid : ValidState.Invalid)
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
                <div>
                    <input 
                        name="emailInput"
                        value={email}
                        onChange={onEmailChange}>
                    </input>
                    <h6 style={{ color: 'red' }}>{emailValidState === ValidState.Invalid && "Некорректная электронная почта"}</h6>
                </div>
            </div>
            <div className="password">
                <h3>Пароль:</h3>
                <div>
                    <input 
                        name="passwordInput"
                        value={password}
                        onChange={onPasswordChange}>
                    </input>
                    <h6 style={{ color: 'red' }}>{passwordValidState === ValidState.Invalid && "Некорректный пароль"}</h6>
                </div>
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