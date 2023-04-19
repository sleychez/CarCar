import React, {useState} from 'react';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {postTrip} from "../../redux/features/trips/tripsSlice";
import style from './CreationTrip.module.css'

const CreationTrip = () => {
    const dispatch = useAppDispatch()

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [cost, setCost] = useState('')


    const createTrip = () => {
        try {
            dispatch(postTrip({from, to, cost}))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.container}>
            <span className={style.title}>Создание поездки</span>
            <div>
                <span>Откуда: </span>
                <Input setValue={setFrom} value={from}/>
            </div>
            <div>
                <span>Куда: </span>
                <Input setValue={setTo} value={to}/>
            </div>
            <div>
                <span>Стоимость: </span>
                <Input setValue={setCost} value={cost}/>
            </div>
            <Button onClick={createTrip} text={'Подтвердить'}/>
        </div>
    );
};

export default CreationTrip;