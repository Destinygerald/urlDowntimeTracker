import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeItem } from "framer-motion";

export type t_message = {
    id: string,
    status: string;
    message: string;
}

type t_state = {
    value: t_message[] | null[]
}

const initialState: t_state = {
    value: []
}

const QueueSlice = createSlice({
    name: "message-queue",
    initialState,
    reducers: {
        addToQueue: (state, action:PayloadAction<t_message>) =>  {
            (state.value as t_message[]).push(action.payload)
        },

        clearQueue: (state) => {
            state.value = []       
        },

        removeFromQueue: (state, action:PayloadAction<string>) => {
            (state.value as t_message[] | null[]) = (state.value as t_message[]).filter(message => message.id != action.payload)
        }
    }
})

export const { addToQueue, clearQueue, removeFromQueue } = QueueSlice.actions;
export default QueueSlice.reducer;