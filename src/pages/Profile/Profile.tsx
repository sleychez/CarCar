import React, {FC,  useState} from 'react';

import Button from "../../components/Button/Button";
import Form from 'react-bootstrap/Form';
import {getUserData} from "../../redux/features/profile/profileSlice";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import {useAppDispatch} from "../../hooks/useAppDispatch";







const Profile:FC = ({}) => {


    const dispatch = useAppDispatch()

    const getUserInfo = () => {
        dispatch(getUserData(user))
    }

    const {user}: any | null = useSelector((state: StateType) => state.profile)

        const [name, setName] = useState(user.username);



    return (
            <div className="container small-container">
                <div>
                    <title>User Profile</title>
                </div>
                <h1 className="my-3">User Profile</h1>
                <form onSubmit={getUserInfo}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>


                    <div className="mb-3">
                        <Button text={'Update'}/>
                    </div>
                </form>
            </div>
        );
    }


export default Profile;