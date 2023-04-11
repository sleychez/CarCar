import React, {FC} from 'react';
import Trip from "../../components/Trip/Trip";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import style from './MyTrips.module.css'

const MyTrips: FC = () => {

    const {bookingTrips} = useSelector((state: StateType) => state.bookingTrips)

    const isTripsGet = bookingTrips.status === 'loaded'

    return (
        <div className={style.booking}>
            {(isTripsGet &&
                (bookingTrips.items).map((item) => (
                    <Trip item={item} isBook={false}></Trip>
                )))}
        </div>
    );
};

export default MyTrips;