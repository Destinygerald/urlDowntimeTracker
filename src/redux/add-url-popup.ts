import { createSlice } from "@reduxjs/toolkit";

type T_InitialState = {
    value: {
        open : boolean
    }
}

const initialState: T_InitialState = {
    value: {
        open: false
    }
}

const AddUrlPopupSlice = createSlice({
    name: 'add-url-popup',
    initialState,
    reducers: {
        openPopup: (state) => {
            state.value.open = true
        },

        closePopup: (state) => {
            state.value.open = false
        }
    }
})


export const { closePopup, openPopup } = AddUrlPopupSlice.actions
export default AddUrlPopupSlice.reducer;