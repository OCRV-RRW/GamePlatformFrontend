import { useState } from "react"
import { fetch_register } from "../../api/registerAPI"
import { RegisterForm } from "../../app/api_forms_interfaces"
import ReturnToLoginButton from "../login/ReturnToLoginButton"
import { FieldErrors, useForm } from "react-hook-form"
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../constants/reg-exp"
import RegisterFormResolver from "../../validate/form_resolvers/register_resolver"
import register_styles from '../../../src/css_modules/style.module.css'
import { grey, red } from "@mui/material/colors"
import { Button, InputLabel, TextField } from "@mui/material"

export default function Register() {
    const [registrationState, setRegistrationState] = useState<string>("")

    const checkErrors = (errors: FieldErrors<RegisterForm>) : boolean => {
        return ((errors.email !== undefined) || 
            (errors.name !== undefined) ||
            (errors.password !== undefined) || 
            (errors.password_confirm !== undefined))
    }

    const {register, handleSubmit, formState: { errors }, trigger, reset } = useForm<RegisterForm>( 
        { 
            resolver: RegisterFormResolver, 
            mode: 'onChange',
            defaultValues: { name: "", email: "", password: "", password_confirm: "" }
        } )

    const onRegister = (data: RegisterForm) => {
        fetch_register(data)
            .then(
                () => setRegistrationState("Перейди на почту"), 
                (reason) => {
                    console.log(reason)
                    setRegistrationState("Проверь правильность почты")
                }
            )
        reset()
    }

    return(
        <>
         <div style={{display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <form onSubmit={handleSubmit((data) => onRegister(data))}>
                <h1 style={{color: grey[900]}}>Регистрация</h1>
                <div>
                    <InputLabel style={{padding: 10}} htmlFor="name" className={register_styles.required}>Имя пользователя:</InputLabel>
                    <div style={{margin: 10}}>
                        <TextField id="name" {...register('name')} placeholder="имя пользователя..." label="Имя пользователя" />
                    </div>
                    {errors.name && <label style={{color: red[400]}}> {errors.name?.message}</label>}
                </div>
                <div>
                    <InputLabel style={{padding: 10}} htmlFor="email" className={register_styles.required}>Электронная почта:</InputLabel>
                    <div style={{margin: 10}}>
                        <TextField id="email" {...register('email', {pattern: EMAIL_REG_EXP})} placeholder="электронная почта..." label="Электронная почта" />
                    </div>
                    {errors.email && <label style={{color: red[400]}}> {errors.email?.message}</label>}
                </div>
                <div>
                    <InputLabel style={{padding: 10}} htmlFor="password" className={register_styles.required}>Пароль:</InputLabel>
                    <div style={{margin: 10}}>
                        <TextField id="password" {...register('password', {pattern: PASSWORD_REG_EXP, onChange: () => trigger("password_confirm")})} placeholder="пароль..." label="Пароль" />
                    </div>
                    {errors.password && <label style={{color: red[400]}}> {errors.password?.message}</label>}
                </div>
                <div>
                    <InputLabel style={{padding: 10}} htmlFor="password_confirm" className={register_styles.required}>Повтори пароль:</InputLabel>
                    <div style={{margin: 10}}>
                        <TextField id="password_confirm" {...register('password_confirm', {validate: 
                            (value, formValues) => value === formValues.password})} placeholder="повтори пароль..." label="Повтори пароль" />
                    </div>
                    {errors.password_confirm && <label style={{color: red[400]}}> {errors.password_confirm?.message}</label>}
                </div>
                <Button sx={{
                    '&.MuiButton-outlined': {
                        color: grey[900],
                        borderColor: grey[900]
                    },
                    '&.Mui-disabled': {
                        color: red[100],
                        borderColor: red[100]
                    }
                }} style={{margin: 10}} type='submit' variant='outlined' disabled={checkErrors(errors)}>Зарегистрироваться</Button>
            </form>
            <div className="buttons">
                <ReturnToLoginButton />
            </div>
            <h1 style={{color: red[200]}}>{registrationState}</h1>
            <h1 style={{color: red[400]}}>ОЦРВ</h1>
         </div>
        </>
    )
} 