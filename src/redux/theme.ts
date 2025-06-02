import { createSlice } from "@reduxjs/toolkit";

type T_Theme = "dark" | "light"

interface I_InitialState {
    value: T_Theme
}

const initialState:I_InitialState = {
    value: "dark"
}

const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.value == "dark") {
                state.value = "light"
                return;
            }

            state.value = "dark"
        }
    }
})

export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;