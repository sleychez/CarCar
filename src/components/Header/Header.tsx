import React from 'react';
import {Layout} from "antd";

import style from './Header.module.css'
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {checkIsAuth, logout} from "../../redux/features/auth/authSlice";
import {toast} from "react-toastify";


export const Header: React.FC = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const loginCallback = () => {
        navigate('/login')
    }

    const logoutHandler = () => {
        navigate('/login')
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')

    }


    const {Header} = Layout;


    return <Header className={style.header}>
       <span className={style.carCar}>CarCar</span>
        {isAuth
            ? <>
                <Button text={'Выйти'} onClick={logoutHandler}/>
            </>
            :
            <Button text={'Войти'} onClick={loginCallback}/>


        }
    </Header>

}