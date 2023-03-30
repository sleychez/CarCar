import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {StateType} from "../../store";



const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

type UserType = {
    username: string,
    password: string
}



export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({username, password}: UserType) => {
        try {
            const {data} = await axios.post('/auth/register', {
                username,
                password,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({username, password}: UserType) => {
        try {
            const {data} = await axios.post('/auth/login', {
                username,
                password,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getMe = createAsyncThunk('auth/meUser', async () => {
    try {
        const { data } = await axios.get('/auth/me')
        return data
    } catch (error) {
        console.log(error)
    }
})



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending,(state ) => {
            state.isLoading = true
            state.status = null
        })
            .addCase(registerUser.fulfilled, (state, action ) => {
             state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token

        })
            .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
                // @ts-ignore
                state.status = action.payload.message
        })
        // Login
            .addCase(loginUser.pending,(state ) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(loginUser.fulfilled, (state, action ) => {
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.user
                state.token = action.payload.token

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                // @ts-ignore
                state.status = action.payload.message
            })
        // Check auth
            .addCase(getMe.pending,(state ) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(getMe.fulfilled, (state, action ) => {
                state.isLoading = false
                state.status = null
                state.user = action.payload?.user
                state.token = action.payload?.token

            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                // @ts-ignore
                state.status = action.payload.message
            })
    }
})


export const checkIsAuth = (state: StateType) => Boolean(state.auth.token)
export const { logout } = authSlice.actions

export default authSlice.reducer