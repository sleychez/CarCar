import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import style from './ListOfUsers.module.css'
import UserInfo from "../../components/UserInfo/UserInfo";
import {getUsersData} from "../../redux/features/users/usersSlice";


const ListOfUsers = () => {


    const {users} = useSelector((state: StateType) => state.users)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersData())
    }, [dispatch])

    const isUsersGet = users.status === 'loaded'

    return (
        <div className={style.content}>
        <span className={style.title}>Список пользователей:</span>
        <div className={style.users}>
            {(isUsersGet &&
                (users.userItems).map((item) => (
                    <UserInfo item={item}></UserInfo>
                )))}
        </div>
        </div>
    );
};

export default ListOfUsers;