import React from 'react';
import { Table, Link } from '@nextui-org/react'
import IMember from '../interfaces/IMember';
import axios from 'axios';

interface Iprops {
    users?: IMember[] | undefined;
    budget?: number;
}


const MembersLeaderboard = (props: Iprops) => {


    const tableColumns = [
        { name: "Username", selector: "username", sortable: true, type: "string" },
        { name: "Balance", selector: "balance", sortable: true, type: "number" },
        { name: "Portfolio Value", selector: "portfolioValue", sortable: true, type: "number" },
        { name: "Growth %", selector: "growth", sortable: true, type: "number"}
    ];
    


    const getUserName = (userId: number): string | undefined => {
        try{
            axios.get(`http://localhost:8080/api/users/${userId}`).
            then(res => {
                console.log("received username",res.data.username);
                return res.data.username;
            })
        }
        catch(e){
            console.log(e);
            return "Problemo";
        }
    };

    const renderCell =  (row: IMember, columnKey: React.Key) => {
        // Will be marked as an error by Typescript, but works in practice

        switch(columnKey){
            case "username":
                return <Link href={"/profilepage/"+row.id.userId}>{getUserName(row.id.userId) ||"dyn uNames"}</Link>;
            case "balance":
                return( 
                <span>
                    {"$" + row.portfolio.remainingBudget}
                </span>
                );
            case "portfolioValue":
                return(
                    <span>
                     {"$" + (row.portfolio.totalValue)}
                     </span>);

            case "growth":
                let value = ((row.portfolio.totalValue)/
                (props.budget || 1) * 100 - 100);
                return(
                    <span style={value >= 0 ? {color: "#6fe3b4"} : {color: "#ff6961"}}>
                        {value.toFixed(2) + "%"}
                    </span>
                );
        }
    };
    
    return (
        <>
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
                <Table.Body items={props.users || []}>
                    {(item) => (
                        <Table.Row key={item.id.userId} css={{marginBottom: "5rem"}}>
                          {(columnKey) => (
                            <Table.Cell key={columnKey}> {renderCell(item, columnKey)} </Table.Cell>
                          )}  
                          </Table.Row>
                    )}
                </Table.Body>
                    <Table.Pagination 
                        noMargin
                        align='center'
                        rowsPerPage={5}
                    />
            </Table>
        </>
    );
};

export default MembersLeaderboard;