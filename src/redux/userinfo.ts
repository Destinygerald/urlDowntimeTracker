import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type t_userinfo = {
    email: string;
    name: string;
}

type t_state = {
    value: t_userinfo
}

const initialState: t_state = {
    value: {
        email: "",
        name: ""
    }
}

const UserSlice = createSlice({
    name: "userinfo",
    initialState,
    reducers: {
        setUserinfo: (state, action:PayloadAction<t_userinfo>) => {
            state.value.email = action.payload.email
            state.value.name = action.payload.name
        }
    }
})

export const { setUserinfo } = UserSlice.actions
export default UserSlice.reducer