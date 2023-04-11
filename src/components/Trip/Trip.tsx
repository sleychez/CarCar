import React, {FC} from 'react';
import {fetchTrips, Items} from "../../redux/features/trips/tripsSlice";
import style from './Trip.module.css'
import Button from "../Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {bookTrips} from "../../redux/features/bookingTrips/bookingTripsSlice";

type TripProps = {
    item: Items,
    isBook?: boolean

}

const Trip: FC<TripProps> = ({item, isBook}) => {

    const dispatch = useAppDispatch()



    const book = () => {
            dispatch(bookTrips(item._id))
        }



    return (
        <div className={style.content}>
            <div className={style.category}>
                <span>Откуда:</span>
                <span>Куда:</span>
                <span>Цена:</span>
                <span>Водитель:</span>
            </div>
            <div className={style.info}>
                <span>{item.from}</span>
                <span>{item.to}</span>
                <span>{item.cost}</span>
                <span>{item.user.username}</span>
            </div>
            {(isBook &&
                <Button text={'Забронировать'} onClick={book}/>
            )}

        </div>
    )
}

export default Trip;