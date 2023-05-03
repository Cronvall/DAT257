import React, { useEffect } from 'react';
import style from './style.module.css'
import { Table } from '@nextui-org/react'

interface IUserPortfolio{
    username: string;
    email: string;
    balance: number;
    numStocks: number;
    portfolioValue: number;
    growth: number;
}


interface Iprops {
    users: IUserPortfolio[];
}


const MembersLeaderboard = (props: Iprops) => {

    //Change to false when backend is ready
    const [hasUsers, setHasUsers] = React.useState(true);

    //Remove prepopulated users when backend is ready
    const [users, setUsers] = React.useState<IUserPortfolio[]>([
        {
            username: "test1",
            email: "test1@gmail.com",
            balance: 1000,
            numStocks: 5,
            portfolioValue: 2000,
            growth: -80,
        },
        {
            username: "test2",
            email: "test2@gmail.com",
            balance: 800,
            numStocks: 3,
            portfolioValue: 6000,
            growth: -40
        },
        {
            username: "test3",
            email: "test3@gmail.com",
            balance: 500,
            numStocks: 2,
            portfolioValue: 15000,
            growth: 50
        },
        {
            username: "test4",
            email: "test4@gmail.com",
            balance: 200,
            numStocks: 1,
            portfolioValue: 1100,
            growth: 10
        }
    ]);

    const tableColumns = [
        { name: "Username", selector: "username", sortable: true, type: "string" },
        { name: "Balance", selector: "balance", sortable: true, type: "number" },
        { name: "Portfolio Value", selector: "portfolioValue", sortable: true, type: "number" },
        { name: "Growth %", selector: "growth", sortable: true, type: "number"}
    ];
            
    

    useEffect(() => {
        if (props.users.length > 0) {
            setHasUsers(true);
        }

        //Sort users by portfolio value
        users.sort((a, b) => ( a.portfolioValue > b.portfolioValue ? -1 : 1));
    }, []);
    
    return (
        <>
        {
            hasUsers ?
            <Table
                striped
                sticked
                aria-label="Table of users"
                css={{ 
                    width: "100%", minWidth: "40rem", minHeight: "25rem"
                }}
            >
                <Table.Header columns={tableColumns}>
                    {
                        (tableColumn) => (
                            <Table.Column 
                                key={tableColumn.selector} 
                                width="20%"
                            >
                                {tableColumn.name}
                            </Table.Column>
                        )
                    }
                </Table.Header>
                <Table.Body items={users}>
                        {
                            (item) => (
                                <Table.Row key={item.username} css={
                                    {
                                    marginBottom: "5rem",
                                }}>
                                    <Table.Cell>{item.username}</Table.Cell>
                                    <Table.Cell>{item.balance}</Table.Cell>
                                    <Table.Cell>{item.portfolioValue}</Table.Cell>
                                    <Table.Cell css={item.growth > 0 ?
                                         {color: "#6fe3b4"} : {color: "#ff6961"}}
                                    >
                                        {item.growth} %
                                    </Table.Cell>
                                </Table.Row>
                            )
                            
                        }
                </Table.Body>
                    <Table.Pagination 
                        noMargin
                        align='center'
                        rowsPerPage={5}
                    />
            </Table>
            :
            <div>No members found</div>
        }
        </>
    );
};

export default MembersLeaderboard;