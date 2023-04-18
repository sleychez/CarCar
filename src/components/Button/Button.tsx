import React, {FC} from 'react';

import style from './Button.module.css'

type TButtonType = 'button' | 'reset' | 'submit'

type ButtonProps = {
    onClick?: () => void;
    text?: string | number;
    type?: TButtonType

};

const Button: FC<ButtonProps> = ({ onClick, text }) => {
    return <button className={style.button} onClick={onClick}>{text}
    </button>;
};


export default Button;