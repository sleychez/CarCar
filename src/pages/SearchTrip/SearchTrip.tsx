import React, {FC, useEffect, useState} from 'react';
import Input from "../../components/Input/Input";
import bg from '../../assets/images/photo_2023-03-19_18-09-11.png';

import style from './SearchTrip.module.css'
import Button from "../../components/Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchTrips} from "../../redux/features/trips/tripsSlice";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import Trip from "../../components/Trip/Trip";


const SearchTrip:FC = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

const dispatch = useAppDispatch()
    const {trips} = useSelector((state: StateType) => state.trips)

    const isTripsGet = trips.status === 'loaded'


    const getTrips = () => {
        dispatch(fetchTrips({from, to}))
    }


    return (
        <div className={style.content}>
            {(isTripsGet &&
                (trips.items).map((item) => (
            <Trip item={item}></Trip>
            )))}
            <img src={bg} className={style.backgroundImg}/>
            <div className={style.inputButton}>
                <Input value={from} setValue={setFrom} placeholder={'Откуда'}/>
                <Input value={to} setValue={setTo} placeholder={'Куда'}/>
                <Button text={'Найти'} onClick={getTrips}/>
            </div>
        </div>
    );
};

export default SearchTrip;