import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})


export type StateType = ReturnType<typeof store.getState>

