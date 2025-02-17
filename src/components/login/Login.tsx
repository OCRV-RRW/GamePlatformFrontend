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
import { Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() : JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [formIsInvalid, setFormIsInvalid] = useState<boolean | undefined>(undefined)
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
        <div style={{display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <form onSubmit={handleSubmit((data) => onLogin(data))}>
                <h1 style={{color: grey[900]}}>ЛОГИН</h1>
                <div>
                    <InputLabel htmlFor="email" className={login_styles.required} style={{padding: 10}}>Электронная почта:</InputLabel>
                    <div style={{margin: 10}}>
                        <TextField id="email" {...register('email')} placeholder="электронная почта..." label="Электронная почта" />
                    </div>
                    {errors.email && <label style={{color: red[400]}}> {errors.email?.message}</label>}
                </div>
                <div>
                    <InputLabel htmlFor='password' className={login_styles.required} style={{padding: 10}}>Пароль:</InputLabel>
                    <div style={{margin: 10}}>
                    <OutlinedInput
                        {...register('password')}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder='пароль...'
                    />
                    </div>
                    {errors.password && <label style={{color: red[400]}}> {errors.password?.message}</label>}
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
                }} style={{margin: 10}} type='submit' variant='outlined' disabled={checkErrors(errors)}>Войти</Button>
            </form>
            <div style={{display: 'flex', flexDirection: 'column', width: 250}} className="buttons">
                <Button sx={{
                    '&.MuiButton-outlined': {
                        color: grey[900],
                        borderColor: grey[900]
                    }
                }} style={{margin: 10}} type='submit' variant='outlined' className="login_button" 
                    name="register_button"
                    onClick={() => navigate(REGISTER_PATH)}>
                        Зарегистрироваться
                </Button>
                <Button sx={{
                    '&.MuiButton-outlined': {
                        color: grey[900],
                        borderColor: grey[900]
                    }
                }} style={{margin: 10}} type='submit' variant='outlined' className="login_button" 
                    name="forgot_password_button"
                    onClick={() => navigate(FORGOT_PASSWORD_PATH)}>
                        Забыл пароль
                </Button>
            </div>
            {formIsInvalid && <h1 style={{color: red[200]}}>Неправильный логин или пароль</h1>}
            <h1 style={{color: red[400]}}>ОЦРВ</h1>
        </div>
    </>)
}