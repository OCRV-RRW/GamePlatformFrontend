export const EMAIL_REG_EXP : RegExp = /\S+@\w+\.\w+/
export const PASSWORD_REG_EXP : RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
export const QUERY_STRING_GAME_EXP : RegExp = /^\?name=.{1,}$/