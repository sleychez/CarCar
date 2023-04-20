import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchBookTrips} from "../../redux/features/bookingTrips/bookingTripsSlice";
import style from "../MyTrips/MyTrips.module.css";
import UserInfo from "../../components/UserInfo/UserInfo";


const ListOfUsers = () => {


    const {users} = useSelector((state: StateType) => state.users)

    const dispatch = useAppDispatch()

    useEffect(() => {

    }, [dispatch])

    const isUsersGet = users.status === 'loaded'

    return (
        <div className={style.booking}>
            {(isUsersGet &&
                (users.userItems).map((item) => (
                    <UserInfo ></UserInfo>
                )))}
        </div>
    );
};

export default ListOfUsers;