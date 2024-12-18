import { EMAIL_REG_EXP } from "../constants/reg-exp";

export default function EmailValidate(email_text: string) : boolean {
    return EMAIL_REG_EXP.test(email_text)
}