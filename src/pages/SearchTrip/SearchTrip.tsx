import React, {FC, useState} from 'react';
import Input from "../../components/Input/Input";
import {ReactComponent as Background} from '../../assets/images/blabla 2.svg';

import style from './SearchTrip.module.css'
import Button from "../../components/Button/Button";

const SearchTrip:FC = () => {
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");

    return (
        <div className={style.content}>
            <Background className={style.backgroundImg}/>
        <div className={style.inputButton}>
<Input input={firstInput} setInput={setFirstInput} placeholder={'Откуда'}/>
            <Input input={secondInput} setInput={setSecondInput} placeholder={'Куда'}/>
            <Button text={'Найти'}/>
        </div>
        </div>
    );
};

export default SearchTrip;