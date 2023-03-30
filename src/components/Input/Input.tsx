import React, {FC} from 'react';

import style from './Input.module.css'

type InputProps = {
    value?: string | number;
    setValue: (value: string) => void;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
placeholder?: string;
onChange?: (e: any) => void
};


const Input: FC<InputProps> = ({ value, setValue, disabled, type,placeholder }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <input className={style.input}
            type={type}
            value={value}
            onChange={handleChange}
            disabled={disabled}
               placeholder={placeholder}
        />
    );
};

export default Input;