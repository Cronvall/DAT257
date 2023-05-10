import React, { useEffect } from "react";

import { Table } from '@nextui-org/react'

interface IUserPortfolio{
    username: string;
    email: string;
    balance: number;
    portfolioValue: number;
    growth: number;
}


interface Iprops {
    user: IUserPortfolio;
}


const MembersRow = (props: Iprops) => {

    const [growthColor, setGrowthColor] = React.useState("");


    useEffect(() => {
        if(props.user.growth > 0){
            setGrowthColor("#6fe3b4")
        }
        else{
            setGrowthColor("#ff6961")
        }
    }, []);

    return(
        <Table.Row key={props.user.username} css={
            {
            marginBottom: "5rem",
        }}>
            <Table.Cell>{props.user.username}</Table.Cell>
            <Table.Cell>{props.user.balance}</Table.Cell>
            <Table.Cell>{props.user.portfolioValue}</Table.Cell>
            <Table.Cell css={{color: growthColor}}
            >
                {props.user.growth} %
            </Table.Cell>
        </Table.Row>
    )

}

export default MembersRow;