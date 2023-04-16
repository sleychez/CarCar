import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {StateType} from "../../store";
import {toast} from "react-toastify";
import {getError} from "../../../utils/getError";

type ResetPasswordType = {
    password: string,
    token: string,
    confirmPassword: string
}


type InitialStateType = {
    user: null | string,
    token: null | string,
    isLoading: boolean,
    status: null | string
}


const initialState: InitialStateType = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

export type UserType = {
    username: string | null,
    password: string | null,
    email?: string | null
}



export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({username, password, email}: UserType) => {
        try {
            const {data} = await axios.post('/auth/register', {
                username,
                password,
                email
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


export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (username: string) => {
    try {
        const { data } = await axios.post('/auth/forget-password', {
            username,
        });
        toast.success(data.message);
    } catch (err) {
        // @ts-ignore
        toast.error(getError(err));
    }
});

export const resetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async ({password, token, confirmPassword}: ResetPasswordType) => {
 if (password !== confirmPassword) {
        toast.error('Пароли не совпадают');
        return;
    }
    try {
        await axios.post('/auth/reset-password', {
            password,
            token,
        });
        toast.success('Password updated successfully');
    } catch (err: any) {

        toast.error(getError(err));
    }
});



const authSlice = createSlice({
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

export const authReducer = authSlice.reducer