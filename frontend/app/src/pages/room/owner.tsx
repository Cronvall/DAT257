import React from 'react';
import style from './style.module.css'

const Owner = (props: any) => {

    const {owner} = props;
    const displayMembers = () => {

        return(
        <div className={style.members}>
        <div>{owner.username}</div>
        <div>{owner.email}</div>
        <div>owner</div>
    </div>
    )};

    return (
        <div>
            {displayMembers()}
        </div>
    )
        
};export default Owner;