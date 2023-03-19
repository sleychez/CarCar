import React, {FC} from 'react';

import style from './Input.module.css'

type InputProps = {
    input: string | number;
    setInput: (value: string) => void;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
placeholder?: string
};


const Input: FC<InputProps> = ({ input, setInput, disabled, type,placeholder }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };
    return (
        <input className={style.input}
            type={type}
            value={input}
            onChange={handleChange}
            disabled={disabled}
               placeholder={placeholder}
        />
    );
};

export default Input;