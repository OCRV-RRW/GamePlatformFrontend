import { PASSWORD_REG_EXP } from "../constants/reg-exp"

export default function PasswordValidate(password_text: string) : boolean {
    return PASSWORD_REG_EXP.test(password_text)
}