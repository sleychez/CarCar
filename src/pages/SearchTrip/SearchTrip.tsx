import React, {FC, useState} from 'react';
import Input from "../../components/Input/Input";
import {ReactComponent as Background} from '../../assets/images/blabla 2.svg';

import style from './SearchTrip.module.css'
import Button from "../../components/Button/Button";

const SearchTrip:FC = () => {
    const [input, setInput] = useState("");

    return (
        <div className={style.content}>
            <Background className={style.backgroundImg}/>
        <div className={style.inputButton}>
<Input input={input} setInput={setInput} placeholder={'Откуда'}/>
            <Input input={input} setInput={setInput} placeholder={'Куда'}/>
            <Button text={'Найти'}/>
        </div>
        </div>
    );
};

export default SearchTrip;