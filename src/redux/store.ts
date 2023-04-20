import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./features/auth/authSlice";
import {tripsReducer} from "./features/trips/tripsSlice";
import {bookingTripsReducer} from './features/bookingTrips/bookingTripsSlice'
import {profileReducer} from "./features/profile/profileSlice";
import {usersReducer} from "./features/users/usersSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        trips: tripsReducer,
        bookingTrips: bookingTripsReducer,
        profile: profileReducer,
        users: usersReducer
    }
})


export type StateType = ReturnType<typeof store.getState>

