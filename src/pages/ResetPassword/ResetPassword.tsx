import {FC, useState} from "react";
import {Form} from "react-bootstrap";
import Button from "../../components/Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {forgetPassword, resetPassword} from "../../redux/features/auth/authSlice";
import {useNavigate, useParams} from "react-router-dom";


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
        <div className="small-container">
            <div>
                <title>Reset Password</title>
            </div>
            <h1 className="my-3">Reset Password</h1>
            <Form onSubmit={resetUserPassword}>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        value={password}
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className="mb-3">
                    <Button text={'Обновить пароль'}/>
                </div>
            </Form>
        </div>
    );
}

export default ResetPassword