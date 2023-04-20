import React, {FC} from 'react';
import {deleteTrip, fetchCreatedTrips, Items} from "../../redux/features/trips/tripsSlice";
import style from './Trip.module.css'
import Button from "../Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {
    bookTrips,
    deleteBookTrip,
    fetchBookTrips
} from "../../redux/features/bookingTrips/bookingTripsSlice";

type TripProps = {
    item: Items,
    isBook?: boolean,
    isCreated?: boolean
}

const Trip: FC<TripProps> = ({item, isBook, isCreated}) => {

    const dispatch = useAppDispatch()


    const book = () => {
        dispatch(bookTrips(item._id))
    }

    const deleteTripItem = async () => {
        if (isCreated) {
            await dispatch(deleteTrip(item._id))
            dispatch(fetchCreatedTrips())
        } await dispatch(deleteBookTrip(item._id))
        dispatch(fetchBookTrips())
    }


    return (
        <div>
            {item?.from &&
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
                        <span>{item.user?.username}</span>
                    </div>
                    {(isBook ?
                        <Button text={'Забронировать'} onClick={book}/>
                        :<Button text={'Удалить'} onClick={deleteTripItem}/>)}

                </div>
            }
        </div>
    )
}

export default Trip;