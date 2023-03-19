import React, {FC} from 'react';

import style from './Profile.module.css'


const Profile:FC = () => {
    return (
        <div>
<div className={style.profileInfo}>
    <div className={style.photo}></div>
    <h2>Имя</h2>
    <h2>Фамилия</h2>
    <h2>Телефон</h2>
    <h2 style={{cursor: "pointer"}}>Стать водителем</h2>
</div>
        </div>
    );
};

export default Profile;