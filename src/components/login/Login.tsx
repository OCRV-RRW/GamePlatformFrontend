import login_styles from '../../../src/css_modules/style.module.css'
import { LoginForm } from "../../app/api_forms_interfaces";
import { useAppDispatch } from "../../app/hooks";
import { send_log_in_form } from "../../reducers/UserSlice";
import { FORGOT_PASSWORD_PATH, REGISTER_PATH } from "../../constants/BrowserPathes";
import { useNavigate } from "react-router";
import { FieldErrors, useForm } from "react-hook-form";
import LoginFormResolver from '../../validate/form_resolvers/login_resolver';
import { UserState } from '../../app/states-interfaces';
import { useState } from 'react';

export default function Login() : JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [formIsInvalid, setFormIsInvalid] = useState<boolean | undefined>(undefined)

    const {register, handleSubmit, formState: { errors }, reset } = useForm<LoginForm>( 
            {
                resolver: LoginFormResolver, 
                mode: 'onChange', 
                defaultValues: { email: "", password: "" } 
            }
        )
    
    const checkErrors = (errors: FieldErrors<LoginForm>) : boolean => {
            return ((errors.email !== undefined) || 
                (errors.password !== undefined))
        }    
    
    function onLogin(data: LoginForm) {
        dispatch(send_log_in_form(data)).then((data) => {
            if ((data.payload as UserState).access_token === undefined) {
                setFormIsInvalid(true)
            }
        })
        reset()
    }

    return (<>
        <form onSubmit={handleSubmit((data) => onLogin(data))}>
            <h1>ЛОГИН</h1>
            <div>
                <label htmlFor="email" className={login_styles.required}>Электронная почта:</label>
                <input id="email"
                    className={errors.email && login_styles.invalid}
                    {...register('email')} placeholder="электронная почта..." />
                {errors.email && <label style={{'color': "red"}}> {errors.email?.message}</label>}
            </div>
            <div>
                <label htmlFor='password' className={login_styles.required}>Пароль:</label>
                <input id='password' className={errors.password && login_styles.invalid}
                    {...register('password')} placeholder='пароль...' />
                {errors.password && <label style={{'color': "red"}}> {errors.password?.message}</label>}
            </div>
            <button  disabled={checkErrors(errors)} className="login_button">Войти</button>
        </form>
        <div className="buttons">
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
        {formIsInvalid && <h1 style={{'color': 'red'}}>Неправильный логин или пароль</h1>}
        <h1>Спасибо что пользуетесь играми ОЦРВ!!</h1>
    </>)
}