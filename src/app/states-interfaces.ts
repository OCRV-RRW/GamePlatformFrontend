import { User } from "./user_type"

export interface PageState {
    current_page: string
}

export interface UserState {
    user_data: User | null
    access_token: string
    expired_in?: string
}