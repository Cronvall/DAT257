import React from 'react';
import { Table, Link } from '@nextui-org/react'
import IStock from '../interfaces/IStock';


interface IProps{
    stocks: IStock[];
}

const StocksTable = (props: IProps) => {

    const tableColumns = [
        { name: "Ticker", selector: "ticker", type: "string" },
        { name: "amount #", selector: "amount", sortable: true, type: "number"},
        { name: "Price $", selector: "current", sortable: true, type: "number" },
        { name: "Total $", selector: "total", sortable: true, type: "number"},
        { name: "profit", selector: "profit", sortable: true, type: "number"}
    ];

    const renderCell = (row: IStock, columnKey: React.Key) => {
        // Will be marked as an error by Typescript, but works in practice
        const cellValue = row[columnKey];

        switch(columnKey){
            case "ticker":
                return <Link href={"/stock/"+cellValue}>${cellValue}</Link>;
            case "profit":
                return( 
                <span style={cellValue >= 0 ? {color: "#6fe3b4"} : {color: "#ff6961"}} >
                    {cellValue} %
                </span>
                );
            case "current":
                return "$ " + cellValue;

            case "amount":
                return "# " + cellValue;

            case "total":
                return "$ " + row.current * row.amount;
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
                <Table.Body items={props.stocks}>

                    {(item) => (
                        <Table.Row key={item.ticker} css={{marginBottom: "5rem"}}>
                          {(columnKey) => (
                            <Table.Cell key={columnKey}> {renderCell(item, columnKey)} </Table.Cell>
                          )}  
                          </Table.Row>
                    )}

                </Table.Body>
            </Table>
        </>
    );
};

export default StocksTable;