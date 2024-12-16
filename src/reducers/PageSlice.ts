import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../app/store";
import { PageState } from "../app/states-interfaces";

const initialState : PageState = {
    current_page: ""
}

const pageSlice = createSlice({
    name: 'page',
    initialState, 
    reducers: {
        set_page(state, action: PayloadAction<string>) {
            state.current_page = action.payload
        }
    }
})

export const selectCurrentPage = () => store.getState().page.current_page
export const { set_page } = pageSlice.actions
export default pageSlice.reducer 