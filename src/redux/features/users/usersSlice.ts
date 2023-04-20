import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchTrips} from "../trips/tripsSlice";
import {UserType} from "../auth/authSlice";
import axios from "../../../utils/axios";
import {toast} from "react-toastify";
import {getError} from "../../../utils/getError";



type InitialStateType = {
    users: {
        userItems: UserType[],
        status: string
    }
}

const initialState: InitialStateType = {
    users: {
        userItems: [],
        status: 'loading'
    }
}


export const getUsersData = createAsyncThunk(
    'auth/getUsersData',
    async ({username, password, email, car , roles}: UserType) => {
        try {
            const { data } = await axios.get(
                '/auth/users',
                {
                    params: {
                        username,
                        password,
                        email,
                        car,
                        roles
                    }
                },
            );
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err: any) {
            toast.error(getError(err));
        }
    }
)

const usersSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrips.pending, (state) => {
                state.users.userItems = []
                state.users.status = 'loading'
            })
            .addCase(fetchTrips.fulfilled, (state, action) => {
                state.users.userItems = action.payload
                state.users.status = 'loaded'
            })
            .addCase(fetchTrips.rejected, (state)  => {
                state.users.userItems = []
                state.users.status = 'error'
            })
    }
})

export const usersReducer = usersSlice.reducer