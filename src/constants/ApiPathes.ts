//ROOT
export const API_PATH: string = "https://ocrv-game.ru/game-platform/api/v1"

//AUTH
export const AUTH_API_PATH: string = API_PATH + '/auth'
export const API_REGISTER_PATH: string = AUTH_API_PATH + '/register'
export const API_LOGIN_PATH: string = AUTH_API_PATH + '/login'
export const API_LOGOUT_PATH: string = AUTH_API_PATH + '/logout'
export const API_FORGOT_PASSWORD_PATH: string = AUTH_API_PATH + '/forgot-password'
export const API_RESET_PASWORD_PATH: string = AUTH_API_PATH + '/reset-password'
export const API_REFRESH_PATH: string = AUTH_API_PATH + '/refresh'

//USER
export const API_USER_PATH: string = API_PATH + '/users'
export const API_USER_ME_PATH: string = API_USER_PATH + '/me'
export const API_DELETE_USER_PATH: string = API_USER_PATH
export const API_GET_USER_PATH: string = API_USER_PATH