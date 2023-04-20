import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {Items} from "../trips/tripsSlice";
import {toast} from "react-toastify";


type InitialStateType = {
    bookingTrips: {
        items: Items[],
        status: string
    }
}

const initialState: InitialStateType = {
    bookingTrips: {
        items: [],
        status: 'loading'
    }
}




export const bookTrips = createAsyncThunk('booking/book', async (tripId: string) => {
    try {
        const {data} = await axios.post('/booking/book', {tripId})
        toast.success(data.message)
        return data
    } catch (error) {
        console.log(error)
    }
})


export const fetchBookTrips = createAsyncThunk('booking/getBookings', async () => {
    try {
        const {data} = await axios.get('/booking/getBookings')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteBookTrip = createAsyncThunk(
    'trip/deleteBookTrip',
    async (tripId: string) => {
        const {data} = await axios.delete(`/booking/deleteBookTrip/${tripId}`)
        return data
    }
)



const bookingTripsSlice = createSlice({
    name: 'bookingTrips',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookTrips.pending, (state) => {
                state.bookingTrips.items = []
                state.bookingTrips.status = 'loading'
            })
            .addCase(fetchBookTrips.fulfilled, (state, action) => {
                state.bookingTrips.items = action.payload
                state.bookingTrips.status = 'loaded'
            })
            .addCase(fetchBookTrips.rejected, (state)  => {
                state.bookingTrips.items = []
                state.bookingTrips.status = 'error'
            })
    }
})

export const bookingTripsReducer = bookingTripsSlice.reducer