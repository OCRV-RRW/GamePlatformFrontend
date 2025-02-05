import { Skill } from "./skill_type"

export type Game = {
    config: string
    created_at: Date,
    description: string,
    name: string,
    friendly_name: string,
    skills: Array<Skill>,
    source: string
}