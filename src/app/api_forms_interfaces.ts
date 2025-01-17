export interface ApiForm {}

export interface LoginForm extends ApiForm {
    email: string
    password: string
}

export interface RegisterForm extends ApiForm {
    name: string
    email: string
    password: string
    password_confirm: string
}

export interface ForgotPasswordForm extends ApiForm {
    email: string
}

export interface ResetPasswordForm extends ApiForm {
    password: string
    password_confirm: string
}

export interface AddScoreToSkillForm extends ApiForm {
    score: number,
    skill_name: string
}