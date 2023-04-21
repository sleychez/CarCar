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
    async () => {
        try {
            const { data } = await axios.get(
                '/auth/users');
            return data
        } catch (err: any) {
            toast.error(getError(err));
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersData.pending, (state) => {
                state.users.userItems = []
                state.users.status = 'loading'
            })
            .addCase(getUsersData.fulfilled, (state, action) => {
                state.users.userItems = action.payload
                state.users.status = 'loaded'
            })
            .addCase(getUsersData.rejected, (state)  => {
                state.users.userItems = []
                state.users.status = 'error'
            })
    }
})

export const usersReducer = usersSlice.reducer