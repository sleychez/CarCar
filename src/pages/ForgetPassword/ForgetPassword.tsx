
import {FC, useState} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {forgetPassword} from "../../redux/features/auth/authSlice";
import {Form} from "react-bootstrap";
import Button from "../../components/Button/Button";
import style from './Forget.module.css'


const ForgetPassword: FC = () => {

    const [login, setLogin] = useState('');

    const dispatch = useAppDispatch()

    const forgetUserPassword = () => {
        dispatch(forgetPassword(login))
    }


    return (
        <div className={style.container}>
            <div className={style.smallContainer}>
            <div className={style.forgetText}>Введите логин</div>
            <Form onSubmit={forgetUserPassword}>
                <Form.Group className={style.from} controlId="login">
                    <Form.Control
                        value={login}
                        type="login"
                        required
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <div>
                <Button text={'Подтвердить'}/>
            </div>
            </div>
        </div>
    );
}

export default ForgetPassword;