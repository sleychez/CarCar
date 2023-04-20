import React, {FC, useEffect} from 'react';
import Trip from "../../components/Trip/Trip";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import style from './MyTrips.module.css'
import {fetchBookTrips} from "../../redux/features/bookingTrips/bookingTripsSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";

const MyTrips: FC = () => {

    const {bookingTrips} = useSelector((state: StateType) => state.bookingTrips)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBookTrips())
    }, [dispatch])

    const isTripsGet = bookingTrips.status === 'loaded'

    return (
        <div className={style.booking}>
            {(isTripsGet &&
                (bookingTrips.items).map((item) => (
                    <Trip item={item} isBook={false} isCreated={false}></Trip>
                )))}
        </div>
    );
};

export default MyTrips;