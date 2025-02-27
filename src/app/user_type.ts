import { Skill, UserSkill } from "./skill_type"

export interface User  {
    id: string | undefined
    name: string | undefined
    email: string | undefined
    created_at: Date | null
    is_admin: boolean
    birthday: Date | null
    continuous_progress: string
    skills: Array<UserSkill>
    gender: UserGender
    grade: number
}

export type UserGender = "" | "М" | "Ж" 