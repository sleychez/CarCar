import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";
import style from "../Login/Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {checkIsAuth, registerUser} from "../../redux/features/auth/authSlice";
import {StateType} from "../../redux/store";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../hooks/useAppDispatch";



const Register: FC = () => {

    const navigate = useNavigate()

    const loginCallback = () => {
        navigate('/login')
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const {status} = useSelector((state: StateType) => state.auth)
    const isAuth = useSelector(checkIsAuth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/login')
    }, [status, isAuth, navigate])



    const handleSubmit = () => {
        navigate('/login')
        try {
            dispatch(registerUser({username, password, email} ))
            setPassword('')
            setUsername('')
            setEmail('')
        } catch (error) {
            console.log(error)

        }
    }

    return <form
        onSubmit={(e) => e.preventDefault()}
        className={style.form}>
        <h1 className={style.h1}>Регистрация</h1>
        <label className={style.label}>
            Username:
            <Input value={username} placeholder={'Username'} setValue={setUsername}/>
        </label>
        <label className={style.label}>
            Email:
            <Input value={email} placeholder={'Email'} setValue={setEmail}/>
        </label>
        <label className={style.label}>
            Password:
            <Input placeholder={'Password'} type='password' value={password} setValue={setPassword}/>
        </label>

        <div className={style.buttons}>
            <Button text={'Подтвердить'} onClick={handleSubmit}/>
            <Button text={'Есть аккаунт?'} onClick={loginCallback}/>
        </div>
    </form>
};

export default Register;