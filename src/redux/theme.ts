import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
        },

        setTheme: (state, action: PayloadAction<T_Theme>) => {
            state.value = action.payload
        }
    }
})

export const { toggleTheme, setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;