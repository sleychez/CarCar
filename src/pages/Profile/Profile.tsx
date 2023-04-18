import React, {FC, useEffect, useState} from 'react';

import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {postCar} from "../../redux/features/profile/profileSlice";
import {getMe} from "../../redux/features/auth/authSlice";
import style from './Profile.module.css'


const Profile: FC = () => {
    const [car, setCar] = useState('')
    const {user} = useSelector((state: StateType) => state.auth)
    const [active, setActive] = useState(false)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const setCarName = async () => {
        try {
           await dispatch(postCar({car}))
            dispatch(getMe())
            setActive(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.container}>

            {active ? (
                <div className={style.setCar}>
                    <span>Укажите машину: </span>
                    <Input setValue={setCar} value={car}/>
                    <Button  onClick={setCarName} text={'Подтвердить'}/>
                </div>

            ) : (
                <div>
                    <h2>Информация о пользователе:</h2>
                    <div className={style.info}>
                        <span className={style.span}>Логин: </span>
                        {user?.username}
                    </div>
                    <div className={style.info}>
                        <span className={style.span}>Почта: </span>
                        {user?.email}
                    </div>
                    {!user?.car ?
                        <div className={style.button}>
                            <Button onClick={() => setActive(true)} text={'Стать водителем'}/>
                        </div>
                    :
                        <>
                        <div className={style.info}>
                            <span className={style.span}>Машина: </span>
                            {user?.car}
                        </div>
                        <div className={style.button}>
                        <Button onClick={() => setActive(true)} text={'Изменить машину'}/>
                        </div>
                        </>
                    }

                </div>
            )
            }
        </div>
    )
}






export default Profile;