import { UserType } from "./user_type"

export interface PageState {
    current_page: string
}

export interface UserState {
    user_data: UserType | null
    access_token: string
}