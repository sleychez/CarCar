import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";


type InitialStateType = {
    trips: {
        items: Items[],
        status: string
    }
}

const initialState: InitialStateType = {
    trips: {
        items: [],
        status: 'loading'
    }
}

export interface Items {
    to: string,
    from: string,
    cost: number | string,
    user?: UserType,
    _id?: string
}

type TripType = {
    from: string,
    to: string
}

type UserType = {
    username: string
}

export const fetchTrips = createAsyncThunk(
    'trips/fetchTrips',
    async ({from, to}: TripType) => {
    const {data} = await axios.get('/trips/getTrips', {
        params: {
            from: from,
            to: to
        }
    })
    return data
})

export const postTrip = createAsyncThunk('trip/myTrip',
    async ({from, to, cost} : Items) => {
        try {
            const {data} = await axios.post('/trip/createTrip', {
                from,
                to,
                cost
            })
            return data
        } catch (error) {
            console.log(error)
        }
    })




const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchTrips.pending, (state) => {
            state.trips.items = []
            state.trips.status = 'loading'
        })
        .addCase(fetchTrips.fulfilled, (state, action) => {
            state.trips.items = action.payload
            state.trips.status = 'loaded'
        })
        .addCase(fetchTrips.rejected, (state)  => {
            state.trips.items = []
            state.trips.status = 'error'
        })
    }
})

export const tripsReducer = tripsSlice.reducer