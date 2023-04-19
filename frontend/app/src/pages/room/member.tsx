import React from 'react';
import style from './style.module.css'

const Member = (props: any) => {

    const {users} = props;
    const displayMembers = () => {

    if (users.length > 0){
        return(
            <div className={style.memberList}>

            {users.map((user: any) => {
                console.log(user);
                return (
                        <div className={style.members}>
                            <div>{user.username}</div>
                            <div>{user.email}</div>
                        </div>
                );

            })
        }</div>

        )
    } else {
        return <div>No members found</div>
        }
    }

    return (
        <div>
            {displayMembers()}
        </div>
    )
    
};export default Member;