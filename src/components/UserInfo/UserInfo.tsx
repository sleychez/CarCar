import React from 'react';

import style from "../Trip/Trip.module.css";


const UserInfo = () => {



    return (
        <div className={style.content}>
            <div className={style.category}>
                <span>Откуда:</span>
                <span>Куда:</span>
                <span>Цена:</span>
                <span>Водитель:</span>
            </div>
            <div className={style.info}>
                <span>{}</span>
                <span>{}</span>
                <span>{}</span>
                <span>{}</span>
            </div>
        </div>
    )
}
export default UserInfo;