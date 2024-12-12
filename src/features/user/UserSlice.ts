import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../app/user_type";
import { store } from "../../app/store";
import { LoginForm } from "../../app/forms_types";
import { fetch_log_in } from "../login/loginAPI";
import { drop_access_token, get_access_token, save_access_token } from "../../local-storage/access_token";
import { drop_userdata, get_userdata, save_userdata } from "../../local-storage/user_data";

export interface UserState {
    user_data: UserType | null
    access_token: string
}

const initialState : UserState = {
    user_data: get_userdata(),
    access_token: get_access_token()
}

export const send_log_in_form = createAsyncThunk<UserState, LoginForm>(
    'user/log_in',
    async (login_form: LoginForm) : Promise<UserState> => {
        const {access_token, user_data} = await fetch_log_in(login_form);
        let newState : UserState = {
            user_data: user_data,
            access_token: access_token
        }
        return newState
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        log_out(state) {
            drop_access_token()
            drop_userdata()
            state.access_token = ""
            state.user_data = null
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(send_log_in_form.fulfilled, (state, action) => {
            if (!action.payload.access_token || !action.payload.user_data) return
            save_access_token(action.payload.access_token)
            save_userdata(action.payload.user_data)
            state.access_token = action.payload.access_token;
            state.user_data = action.payload.user_data;
          })
      }
})

export const selectAccessToken = () => store.getState().user.access_token
export const selectUserData = () => store.getState().user.user_data

export const {log_out} = userSlice.actions

export default userSlice.reducer