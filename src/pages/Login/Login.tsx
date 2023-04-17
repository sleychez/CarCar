import React, {FC, useEffect, useState} from 'react';

import style from './Login.module.css'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {checkIsAuth, loginUser} from "../../redux/features/auth/authSlice";
import {toast} from "react-toastify";

const Login: FC = () => {

    const navigate = useNavigate()

    const registerCallback = () => {
        navigate('/register')
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const isAuth = useSelector(checkIsAuth)
    const {status} = useSelector((state: StateType) => state.auth)

    useEffect(() => {
        if (status) toast(status)
        if (isAuth) navigate('/profile')
    }, [status, isAuth, navigate])


    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        navigate('/profile')
        try {
            dispatch(loginUser({username, password}))
        } catch (error) {
            console.log(error)

        }
    }


    return <form style={{margin: '150px auto',}}
                 onSubmit={(e) => e.preventDefault()}
                 className={style.form}>
        <div className={style.authorizationText}>Авторизация</div>
        <label className={style.label}>
            Логин:
            <Input value={username} placeholder={'Username'} setValue={setUsername}/>
        </label>

        <label className={style.label}>
            Пароль:
            <Input placeholder={'Password'} type='password' value={password} setValue={setPassword}/>
        </label>

        <div className={style.buttons}>
            <Button text={'Войти'} onClick={handleSubmit}/>
            <Button text={'Регистрация'} onClick={registerCallback}/>
            <div className={style.forget}>
                Забыли пароль? <Link className={style.link} to={`/forget-password`}>Сбросить пароль</Link>
            </div>
        </div>
    </form>
};

export default Login;