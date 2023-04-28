import React from 'react';
import style from './style.module.css'
import { Table } from '@nextui-org/react'

const Member = (props: any) => {

    const {users} = props;
    const displayMembers = () => {

    if (users.length > 0){
        return(
            <div className={style.memberList}>
                <Table
                    aria-label="Table of league members"
                >
                    <Table.Header>
                        <Table.Column>Username</Table.Column>
                        <Table.Column>Email</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {users.map((user: any) => {
                            console.log(user);
                            return (
                                <Table.Row key={user.id}>
                                        <Table.Cell>{user.username}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                </Table.Row>
                                );
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
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