import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import {tripsReducer} from "./features/trips/tripsSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        trips: tripsReducer
    }
})


export type StateType = ReturnType<typeof store.getState>

