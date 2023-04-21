import React, {FC} from 'react';

import style from "../Trip/Trip.module.css";
import {Items} from "../../redux/features/trips/tripsSlice";
import {UserType} from "../../redux/features/auth/authSlice";


type UserInfoProps = {
    item: UserType,
}

const UserInfo: FC<UserInfoProps> = ({item}) => {


    return (
        <div className={style.content}>
            <div className={style.category}>
                <span>Id:</span>
                <span>Логин:</span>
                <span>Почта:</span>
            </div>
            <div className={style.info}>
                <span>{item._id}</span>
                <span>{item.username}</span>
                <span>{item.email}</span>
            </div>
        </div>
    )
}
export default UserInfo;