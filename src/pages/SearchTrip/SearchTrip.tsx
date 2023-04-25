import React, {FC, useEffect, useState} from 'react';
import Input from "../../components/Input/Input";
import bg from '../../assets/images/photo_2023-03-19_18-09-11.png';
import style from './SearchTrip.module.css'
import Button from "../../components/Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {dropState, fetchTrips} from "../../redux/features/trips/tripsSlice";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import Trip from "../../components/Trip/Trip";
import Info from "../../components/Info/Info";
import icon1 from '../../assets/images/icon1.svg'
import icon2 from '../../assets/images/icon2.svg'
import icon3 from '../../assets/images/icon3.svg'





const SearchTrip:FC = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const dispatch = useAppDispatch()

    const {trips} = useSelector((state: StateType) => state.trips)

    const isTripsGet = trips.status === 'loaded'


    useEffect(() => {
        return () =>  {
            dispatch(dropState())
        }
    }, [])

    const getTrips = () => {
        dispatch(fetchTrips({from, to}))
    }


    return (
        <div className={style.content}>
            <img src={bg} className={style.backgroundImg}/>
            <div className={style.inputButton}>
                <Input value={from} setValue={setFrom} placeholder={'Откуда'}/>
                <Input value={to} setValue={setTo} placeholder={'Куда'}/>
                <Button text={'Найти'} onClick={getTrips}/>
            </div>
            {(isTripsGet &&
                (trips.items).map((item) => (
                    <Trip item={item} isBook></Trip>
                )))}
            <div className={style.containerInfo}>
           <Info text={'Независимо от направления вашей поездки - будь то автобусное сообщение или путешествие с другими попутчиками, у вас есть возможность выбрать наиболее подходящий маршрут и отправиться в путь по выгодной цене.'}
                 icon={icon1} title={'Ваша поездка по низкой цене'}/>
            <Info text={'Мы прилагаем максимум усилий, чтобы детально изучить информацию о ваших потенциальных попутчиках и перевозчиках. Мы осуществляем проверку отзывов, профилей и паспортных данных попутчиков, чтобы обеспечить вам полную прозрачность и понимание, с кем вы собираетесь отправиться в путь.'}
                  icon={icon2} title={'Доверяйте своим попутчикам'}/>
            <Info text={'Заказать поездку стало намного проще. Наше приложение обладает интуитивно понятным интерфейсом: благодаря мощному алгоритму в течение нескольких минут вы найдете водителя рядом с вами, и для бронирования поездки вам потребуется всего лишь нажать несколько кнопок.'}
                  icon={icon3} title={'В дорогу за пару кликов!'}/>
            </div>
        </div>
    );
};

export default SearchTrip;