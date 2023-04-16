
import {FC, useState} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {forgetPassword} from "../../redux/features/auth/authSlice";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import {Form} from "react-bootstrap";
import Button from "../../components/Button/Button";


const ForgetPassword: FC = () => {

    const [login, setLogin] = useState('');

    const dispatch = useAppDispatch()

    const forgetUserPassword = () => {
        dispatch(forgetPassword(login))
    }


    return (
        <div className="small-container">
            <div>
                <title>Forget Password</title>
            </div>
            <h1 className="my-3">Forget Password</h1>
            <Form onSubmit={forgetUserPassword}>
                <Form.Group className="mb-3" controlId="login">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        value={login}
                        type="login"
                        required
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Group>

                <div className="mb-3">
                    <Button text={'submit'}/>
                </div>
            </Form>
        </div>
    );
}

export default ForgetPassword;