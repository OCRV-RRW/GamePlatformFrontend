import { FieldErrors, ResolverResult } from "react-hook-form"
import { ResetPasswordForm } from "../../app/api_forms_types"
import PasswordValidate from "../password_validate"


export default async function ResetPasswordFormResolver(values: ResetPasswordForm): Promise<ResolverResult<ResetPasswordForm>> {
    let errors : FieldErrors<ResetPasswordForm> = {}

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
    
    if (values.confirm_password === "") {
        errors.confirm_password = {
            type: 'required',
            message: 'это поле должно быть заполнено'
        }
    }
    else if (values.confirm_password !== values.password) {
        errors.confirm_password = {
            type: 'validate',
            message: 'пароли должны совпадать'
        }
    }

    return {
        values: values,
        errors: errors
    }
}