import { configureStore } from "@reduxjs/toolkit";
import addUrlPopup from "./add-url-popup.ts"
import theme from "./theme.ts"
import messageQueue from "./message-queue.ts"

export const store = configureStore({
    reducer: {
        addUrlPopup,
        theme,
        messageQueue
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;