import { useState } from "react"
import { fetch_register } from "../../api/registerAPI"
import { RegisterForm } from "../../app/api_forms_types"
import ReturnToLoginButton from "../login/ReturnToLoginButton"
import { FieldErrors, Resolver, useForm } from "react-hook-form"
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../constants/reg-exp"
import EmailValidate from "../../validate/email_validate"
import PasswordValidate from "../../validate/password_validate"
import styles from '../../../src/css_modules/style.module.css'

export default function Register() {
    const [registrationState, setRegistrationState] = useState<string>("")

    const resolver: Resolver<RegisterForm> = async (values) => {
        let errors : FieldErrors<RegisterForm> = {}
        if (values.name === "") {
            errors.name = {
                type: 'required',
                message: 'это поле должно быть заполнено'
            }
        }

        if (values.email === "") {
            errors.email = {
                type: 'required',
                message: 'это поле должно быть заполнено'
            }
        }
        else if (!EmailValidate(values.email)) {
            errors.email = {
                type: 'pattern',
                message: 'неккоректная электронная почта'
            }
        }

        if (values.password === "") {
            errors.password = {
                type: 'required',
                message: 'это поле должно быть заполнено'
            }
        }
        else if (!PasswordValidate(values.password)) {
            errors.password = {
                type: 'pattern',
                message: 'пароль не соответствует правилам'
            }
        }
        
        if (values.password_confirm === "") {
            errors.password_confirm = {
                type: 'required',
                message: 'это поле должно быть заполнено'
            }
        }
        else if (values.password_confirm !== values.password) {
            errors.password_confirm = {
                type: 'validate',
                message: 'пароли должны совпадать'
            }
        }

        return {
            values: values,
            errors: errors
        }
    }

    const {register, handleSubmit, formState: { errors }, trigger } = useForm<RegisterForm>( { resolver, mode: 'all' } )

    const onRegister = (data: RegisterForm) => {
        fetch_register(data)
            .then(
                () => setRegistrationState("Перейди на почту"), 
                (reason) => {
                    console.log(reason)
                    setRegistrationState("Проверь правильность почты")})
    }

    return(
        <>
            <form onSubmit={handleSubmit((data) => onRegister(data))}>
                <h1>Регистрация</h1>
                <div>
                    <label htmlFor="name" className={styles.required}>Имя пользователя:</label>
                    <input id='name'
                        {...register('name')} placeholder="имя пользователя..." />
                    {errors.name && <h6 style={{'color': "red"}}>{errors.name?.message}</h6>}
                </div>
                <div>
                    <label htmlFor="email" className={styles.required}>Электронная почта:</label>
                    <input id='email' 
                        {...register('email', {pattern: EMAIL_REG_EXP})} placeholder="электронная почта..." />
                    {errors.email && <h6 style={{'color': "red"}}>{errors.email?.message}</h6>}
                </div>
                <div>
                    <label htmlFor="password" className={styles.required}>Пароль:</label>
                    <input id='password'
                        {...register('password', {pattern: PASSWORD_REG_EXP, onChange: () => trigger("password_confirm")})} placeholder="пароль..." />
                    {errors.password && <h6 style={{'color': "red"}}>{errors.password?.message}</h6>}
                </div>
                <div>
                    <label htmlFor="password_confirm" className={styles.required}>Повтори пароль:</label>
                    <input id='password_confirm' 
                        {...register('password_confirm', {validate: 
                            (value, formValues) => value === formValues.password})} placeholder="повтори пароль..." />
                    {errors.password_confirm && <h6 style={{'color': "red"}}>{errors.password_confirm?.message}</h6>}
                </div>
                <button className="register_button">Зарегистрироваться</button>
            </form>
            <div className="buttons">
                <ReturnToLoginButton />
            </div>
            <h1 style={{'color': 'red'}}>{registrationState}</h1>
        </>
    )
} 