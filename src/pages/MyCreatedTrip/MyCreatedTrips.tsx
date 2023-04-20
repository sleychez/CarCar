import React, {FC, useEffect} from 'react';
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import style from './MyCreatedTrips.module.css'
import Trip from "../../components/Trip/Trip";
import {fetchCreatedTrips} from "../../redux/features/trips/tripsSlice";

const MyCreatedTrips: FC = () => {

    const {trips} = useSelector((state: StateType) => state.trips)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCreatedTrips())
    }, [dispatch])

    const isTripsGet = trips.status === 'loaded'
    return (
        <div className={style.container}>
            {(isTripsGet &&
                (trips.items).map((item) => (
                    <Trip item={item} isBook={false} isCreated={true}></Trip>
                )))}
        </div>
    );
};

export default MyCreatedTrips;