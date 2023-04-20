import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {toast} from "react-toastify";



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
    _id: string
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

export const postTrip = createAsyncThunk('trip/createTrip',
    async ({from, to, cost} : Omit<Items, '_id' >) => {
        try {
            const {data} = await axios.post('/trips/createTrip', {
                from,
                to,
                cost
            })
            toast.success(data.message)
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const fetchCreatedTrips = createAsyncThunk(
    'trips/fetchTrips',
    async () => {
        const {data} = await axios.get('/trips/createdTrips')
        return data
    })

export const deleteTrip = createAsyncThunk(
    'trip/deleteTrip',
    async (tripId: string) => {
        const {data} = await axios.delete(`/trips/deleteTrip/${tripId}`)
        return data
    }
)



const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        dropState: (state) => {
            state.trips.items = []
        }
    },
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
export const {dropState} = tripsSlice.actions