import React, {FC} from 'react';
import style from './Info.module.css';

export type InfoPropsType = {
    icon: string,
    title: string,
    text: string
}


const Info: FC<InfoPropsType> = ({icon, title, text} ) => {

    return (
        <div>
                <div className={style.smallContainerInfo}>
                    <img src={icon} className={style.icon}/>
                    <span className={style.headlines}>{title}</span>
                    <p>{text}</p>
                </div>
        </div>
    );
};

export default Info;