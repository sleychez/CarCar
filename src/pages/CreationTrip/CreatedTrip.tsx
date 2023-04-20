import React, {useState} from 'react';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {postTrip} from "../../redux/features/trips/tripsSlice";
import style from './CreatedTrip.module.css'

const CreatedTrip = () => {
    const dispatch = useAppDispatch()

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [cost, setCost] = useState('')


    const createTrip = () => {
        try {
            dispatch(postTrip({from, to, cost}))
            setFrom('')
            setTo('')
            setCost('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.container}>
            <span className={style.title}>Создание поездки</span>
        <div className={style.containerTrip}>
            <div className={style.categories}>
                <span className={style.categories}>Откуда:</span>
                <span>Куда:</span>
                <span>Стоимость:</span>
            </div>
            <div className={style.info}>
                <Input setValue={setFrom} value={from}/>
                <Input setValue={setTo} value={to}/>
                <Input setValue={setCost} value={cost}/>
            </div>
        </div>
        <div>
            <Button onClick={createTrip} text={'Подтвердить'}/>
        </div>
        </div>
    );
};

export default CreatedTrip;