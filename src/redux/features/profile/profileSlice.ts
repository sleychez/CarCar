import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {userInfo} from "os";
import {toast} from "react-toastify";
import {UserType} from "../auth/authSlice";
import {getError} from "../../../utils/getError";



type InitialStateType = {
    user: {
        username: string | null | void,
        password: string | null | void
    }
}


const initialState: InitialStateType = {
   user: {
       username: null,
       password: null
   }
}

export const getUserData = createAsyncThunk(
    'auth/getUserData',
    async ({username, password}: UserType) => {
    try {
        const { data } = await axios.get(
            '/auth/me',
            {
               params: {
                   username,
                   password
               }
            },
        );
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err: any) {
        toast.error(getError(err));
    }
}
)

export const postCar = createAsyncThunk('auth/myCar',
    async ({car} : UserType) => {
        try {
            const {data} = await axios.post('/auth/car', {
                car
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)



const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.pending,(state ) => {
                state.user.username = null
                state.user.password = null
            })
            .addCase(getUserData.fulfilled, (state, action ) => {
                state.user.username = action.payload
                state.user.password = action.payload
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.user.username = null
                state.user.password = null
            })
    }
})



export const profileReducer = profileSlice.reducer