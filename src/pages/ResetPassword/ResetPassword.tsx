import {FC, useState} from "react";
import {Form} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {resetPassword} from "../../redux/features/auth/authSlice";
import {useNavigate, useParams} from "react-router-dom";
import style from './ResetPassword.module.css'

const ResetPassword:FC = () => {
    const {token} = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch()
    const  resetUserPassword  = async () => {
        try {
            if (token) {
                await dispatch(resetPassword({password, confirmPassword, token}))
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.smallContainer}>
            <div className={style.resetText}>Обновление пароля</div>
            <Form className={style.form} onSubmit={resetUserPassword}>
                <Form.Group className={style.formGroup} controlId="password">
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control
                        value={password}
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={style.formGroup} controlId="confirmPassword">
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
            </Form>
            <div>
                <Button className={style.button} type='submit'>Подтвердить</Button>
            </div>
            </div>
        </div>
    );
}

export default ResetPassword