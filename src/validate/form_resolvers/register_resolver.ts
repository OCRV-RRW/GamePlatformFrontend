import { FieldErrors, ResolverResult } from "react-hook-form"
import { RegisterForm } from "../../app/api_forms_types"
import EmailValidate from "../email_validate"
import PasswordValidate from "../password_validate"


export default async function RegisterFormResolver(values: RegisterForm): Promise<ResolverResult<RegisterForm>> {
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