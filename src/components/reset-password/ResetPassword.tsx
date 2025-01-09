import { FieldErrors, useForm } from 'react-hook-form'
import reset_password_styles from '../../../src/css_modules/style.module.css'
import { ResetPasswordForm } from '../../app/api_forms_types'
import { PASSWORD_REG_EXP } from '../../constants/reg-exp'
import { useParams } from 'react-router'
import ResetPasswordFormResolver from '../../validate/form_resolvers/reset_password_resolver'
import { fetch_reset_password } from '../../api/resetPasswordAPI'

export default function ResetPassword() {
    const { id } = useParams();
    const {register, handleSubmit, formState: { errors }, trigger, reset } = useForm<ResetPasswordForm>( 
        { 
            resolver: ResetPasswordFormResolver, 
            mode: 'onChange', 
            defaultValues: { password: "", password_confirm: "" } 
        } 
    )
    
    const onResetPassword = (data: ResetPasswordForm) => {
        fetch_reset_password(data, id ?? "").then((response) => {
            console.log(response)
        })
        reset()
    }

    const checkErrors = (errors: FieldErrors<ResetPasswordForm>) : boolean => {
        return ((errors.password !== undefined) || 
            (errors.password_confirm !== undefined))
    }
    
    return (
        <>
            <form onSubmit={handleSubmit((data) => onResetPassword(data))}>
                <h1>Изменение пароля</h1>
                <div>
                    <label htmlFor="password" className={reset_password_styles.required}>Введи новый пароль:</label>
                    <input id='password' className={errors.password && reset_password_styles.invalid}
                        {...register('password', {pattern: PASSWORD_REG_EXP, onChange: () => trigger("password_confirm")})} placeholder="пароль..." />
                    {errors.password && <label style={{'color': "red"}}> {errors.password?.message}</label>}
                </div>
                <div>
                    <label htmlFor="confirm_password" className={reset_password_styles.required}>Повтори пароль:</label>
                    <input id='confirm_password' 
                        className={errors.password_confirm && reset_password_styles.invalid}
                        {...register('password_confirm', {validate: 
                            (value, formValues) => value === formValues.password})} placeholder="повтори пароль..." />
                    {errors.password_confirm && <label style={{'color': "red"}}> {errors.password_confirm?.message}</label>}
                </div>
                <button disabled={checkErrors(errors)} className="reset-password-button">Изменить пароль</button>
            </form>
        </>
    )
}