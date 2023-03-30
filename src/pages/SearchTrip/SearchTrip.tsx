import React, {FC, useState} from 'react';
import Input from "../../components/Input/Input";
import bg from '../../assets/images/photo_2023-03-19_18-09-11.png';

import style from './SearchTrip.module.css'
import Button from "../../components/Button/Button";

const SearchTrip:FC = () => {
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");

    return (
        <div className={style.content}>
            <img src={bg} className={style.backgroundImg}/>
        <div className={style.inputButton}>
<Input value={firstInput} setValue={setFirstInput} placeholder={'Откуда'}/>
            <Input value={secondInput} setValue={setSecondInput} placeholder={'Куда'}/>
            <Button text={'Найти'}/>
        </div>
        </div>
    );
};

export default SearchTrip;