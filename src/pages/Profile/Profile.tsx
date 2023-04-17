import React, {FC, useState} from 'react';

import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {postCar} from "../../redux/features/auth/authSlice";


const Profile: FC = ({}) => {
    const [car, setCarName] = useState('')
    const {user} = useSelector((state: StateType) => state.auth)

    const dispatch = useAppDispatch()

    const setCar = () => {
        try {
            dispatch(postCar({car}))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                {user?.username}
            </div>
            <div>
                {user?.email}
            </div>
            <Button onClick={setCar} text={'Стать водителем'}/>
            <Input setValue={setCarName} value={car}/>
        </div>
    );
}


export default Profile;