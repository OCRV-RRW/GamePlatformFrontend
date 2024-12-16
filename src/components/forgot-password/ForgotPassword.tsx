import { useState } from "react";
import ReturnToLoginButton from "../login/ReturnToLoginButton";
import { fetch_forgot_password } from "../../api/forgotPasswordAPI";

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [forgotPasswordState, setForgotPasswordState] = useState<string>("")

    const onRestorePassword = () => {
        fetch_forgot_password({email: email})
            .then(() => setForgotPasswordState("Перейди на почту"), 
                (reason) => {console.log(reason); setForgotPasswordState("Проверь правильность почты")})
    }

    return (
        <>
            <h1>
                Забыл пароль
            </h1>
            <div className="email">
                <h3>Электронная почта:</h3>
                <input 
                    name="emailInput"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}>
                </input>
            </div>
            <div className="buttons">
                <ReturnToLoginButton />
                <button onClick={onRestorePassword}>Восстановить пароль</button>
            </div>
            <h1>{forgotPasswordState}</h1>
        </>
    )
}