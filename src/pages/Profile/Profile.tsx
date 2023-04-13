import React, {FC} from 'react';

import style from './Profile.module.css'
import Button from "../../components/Button/Button";






const Profile:FC = ({}) => {


    return (
        <div>
<div className={style.profileInfo}>
    <div className={style.photo}></div>
    {}
    <div className={style.name}>
   <span>Имя</span>
    <span>Света</span>
    </div>
    <div>
        <span>Фамилия:</span>
    <span>Света</span>
    </div>
    <div>
    <h2>Телефон</h2>
        <span>89778258187</span>
    </div>
    <br/>
    <Button text={'Стать водителем'}/>
</div>
        </div>
    );
};

export default Profile;