import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../app/store";
import { LoginForm } from "../app/api_forms_interfaces";
import { fetch_log_in } from "../api/loginAPI";
import { fetch_log_out } from "../api/logoutAPI";
import { drop_access_token, get_access_token, rewrite_access_token, save_access_token } from "../local-storage/access_token";
import { drop_userdata, get_userdata, rewrite_user_data, save_userdata } from "../local-storage/user_data";
import { UserState } from "../app/states-interfaces";
import { fetch_user_me } from "../api/getUserMeAPI";
import { User } from "../app/user_type";
import fetch_refresh from "../api/refreshTokenAPI";
import { drop_expired_in, get_expired_in, rewrite_expired_in, save_expired_in } from "../local-storage/expired_in";

const initialState : UserState = {
    user_data: get_userdata(),
    access_token: get_access_token(),
    expired_in: get_expired_in()
}

const setState = (user_data: User, access_token: string, expired_in?: string) : UserState => {
   let newState: UserState = {...store.getState().user, user_data: user_data, access_token: access_token}
   if (expired_in) { newState = {...newState, expired_in} }
   return newState 
}

export const send_log_in_form = createAsyncThunk<UserState, LoginForm>(
    'user/log_in',
    async (login_form: LoginForm) : Promise<UserState> => {
        const {access_token, user_data, expired_in} = await fetch_log_in(login_form);
        let newState = setState(user_data, access_token, expired_in)
        return newState
    }
)

export const send_log_out = createAsyncThunk(
    'user/log_out',
    async () : Promise<{access_token: string}> => {
        const {access_token} = await fetch_log_out();
        return {access_token}
    }
)

export const send_user_get_me = createAsyncThunk(
    'user/get_me',
    async () : Promise<UserState> => {
        const {access_token, user_data} = await fetch_user_me();
        let new_state = setState(user_data!, access_token)
        return new_state
    }
)

export const send_refresh_token = createAsyncThunk(
    'user/refresh',
    async (signal?: AbortSignal) : Promise<{access_token: string, expired_in: string}> => {
        const {access_token, expired_in} = await fetch_refresh(signal);
        return {access_token, expired_in}
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        updateToken(state, action: PayloadAction<{access_token: string}>) {
            rewrite_access_token(action.payload.access_token)
            state.access_token = action.payload.access_token
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(send_log_in_form.fulfilled, (state, action) => {
            if (!action.payload.access_token || !action.payload.user_data) return
            save_access_token(action.payload.access_token)
            save_userdata(action.payload.user_data)
            save_expired_in(action.payload.expired_in!)
            state.access_token = action.payload.access_token;
            state.user_data = action.payload.user_data;
            state.expired_in = action.payload.expired_in;
          })
          .addCase(send_log_out.fulfilled, (state) => {
            drop_access_token()
            drop_userdata()
            drop_expired_in()
            state.access_token = ""
            state.user_data = null
            state.expired_in = ""
          })
          .addCase(send_user_get_me.fulfilled, (state, action) => {
            rewrite_user_data(action.payload.user_data)
            state.user_data = action.payload.user_data
          })
          .addCase(send_refresh_token.fulfilled, (state, action) => {
            rewrite_access_token(action.payload.access_token)
            rewrite_expired_in(action.payload.expired_in)
            state.access_token = action.payload.access_token
            state.expired_in = action.payload.expired_in
          })
      } 
})
export const { updateToken } = userSlice.actions
export const selectAccessToken = () => store.getState().user.access_token
export const selectUserData = () => store.getState().user.user_data
export const selectExpiredIn = () => store.getState().user.expired_in

export default userSlice.reducer