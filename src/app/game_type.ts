import { Skill } from "./skill_type"

export type Game = {
    config: string
    created_at: Date,
    description: string,
    name: string,
    friendly_name: string,
    skills: Array<Skill>,
    debug_source: string,
    release_source: string,
    preview_url: string
}