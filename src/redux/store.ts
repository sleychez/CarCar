import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./features/auth/authSlice";
import {tripsReducer} from "./features/trips/tripsSlice";
import {bookingTripsReducer} from './features/bookingTrips/bookingTripsSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        trips: tripsReducer,
        bookingTrips: bookingTripsReducer
    }
})


export type StateType = ReturnType<typeof store.getState>

