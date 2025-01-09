export type LoginForm = {
    email: string
    password: string
}

export type RegisterForm = {
    name: string
    email: string
    password: string
    password_confirm: string
}

export type ForgotPasswordForm = {
    email: string
}

export type ResetPasswordForm = {
    password: string
    password_confirm: string
}