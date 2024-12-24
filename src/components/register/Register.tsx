import { useState } from "react"
import { fetch_register } from "../../api/registerAPI"
import { RegisterForm } from "../../app/api_forms_types"
import ReturnToLoginButton from "../login/ReturnToLoginButton"
import { FieldErrors, useForm } from "react-hook-form"
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../constants/reg-exp"
import RegisterFormResolver from "../../validate/form_resolvers/register_resolver"
import styles from '../../../src/css_modules/style.module.css'

export default function Register() {
    const [registrationState, setRegistrationState] = useState<string>("")

    const checkErrors = (errors: FieldErrors<RegisterForm>) : boolean => {
        return ((errors.email !== undefined) || 
            (errors.name !== undefined) ||
            (errors.password !== undefined) || 
            (errors.password_confirm !== undefined))
    }

    const {register, handleSubmit, formState: { errors }, trigger } = useForm<RegisterForm>( { resolver: RegisterFormResolver, mode: 'onChange' } )

    const onRegister = (data: RegisterForm) => {
        fetch_register(data)
            .then(
                () => setRegistrationState("Перейди на почту"), 
                (reason) => {
                    console.log(reason)
                    setRegistrationState("Проверь правильность почты")
                }
            )
    }

    return(
        <>
            <form onSubmit={handleSubmit((data) => onRegister(data))}>
                <h1>Регистрация</h1>
                <div>
                    <label htmlFor="name" className={styles.required}>Имя пользователя:</label>
                    <input id='name'
                        className={errors.name && styles.invalid}
                        {...register('name')} placeholder="имя пользователя..." />
                    {errors.name && <label style={{'color': "red"}}>{errors.name?.message}</label>}
                </div>
                <div>
                    <label htmlFor="email" className={styles.required}>Электронная почта:</label>
                    <input id='email' className={errors.email && styles.invalid}
                        {...register('email', {pattern: EMAIL_REG_EXP})} placeholder="электронная почта..." />
                    {errors.email && <label style={{'color': "red"}}>{errors.email?.message}</label>}
                </div>
                <div>
                    <label htmlFor="password" className={styles.required}>Пароль:</label>
                    <input id='password' className={errors.password && styles.invalid}
                        {...register('password', {pattern: PASSWORD_REG_EXP, onChange: () => trigger("password_confirm")})} placeholder="пароль..." />
                    {errors.password && <label style={{'color': "red"}}>{errors.password?.message}</label>}
                </div>
                <div>
                    <label htmlFor="password_confirm" className={styles.required}>Повтори пароль:</label>
                    <input id='password_confirm' 
                        className={errors.password_confirm && styles.invalid}
                        {...register('password_confirm', {validate: 
                            (value, formValues) => value === formValues.password})} placeholder="повтори пароль..." />
                    {errors.password_confirm && <label style={{'color': "red"}}>{errors.password_confirm?.message}</label>}
                </div>
                <button disabled={checkErrors(errors)} className="register_button">Зарегистрироваться</button>
            </form>
            <div className="buttons">
                <ReturnToLoginButton />
            </div>
            <h1 style={{'color': 'red'}}>{registrationState}</h1>
        </>
    )
} 