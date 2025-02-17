import { Skill } from "./skill_type"

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

export interface UpdateGameForm extends ApiForm {
    config: string,
    description: string,
    friendly_name: string,
    skills: Array<string>,
    release_source: string,
    debug_source: string
}

export interface CreateGameForm extends ApiForm {
    config: string,
    debug_source: string
    description: string,
    friendly_name: string,
    name: string,
    release_source: string,
    skills: Array<Skill>
}