import React, { useEffect } from 'react';
import { Table, Link } from '@nextui-org/react'

interface IStock{
    key; number;
    ticker: string;
    number: number;
    portfolioValue: number;
    growth: number;
}



const StocksTable = () => {


    //Remove prepopulated users when backend is ready
    const stocks: IStock[] = [
        {
            key: 1,
            ticker: "GOOGL",
            number: 5,
            portfolioValue: 2000,
            growth: -80,
        },
        {
            key: 2,
            ticker: "META",
            number: 3,
            portfolioValue: 6000,
            growth: -40
        },
        {
            key: 3,
            ticker: "TSLA",
            number: 2,
            portfolioValue: 15000,
            growth: 50
        },
        {
            key: 4,
            ticker: "AAPL",
            number: 1,
            portfolioValue: 1100,
            growth: 10
        }
    ];

    const tableColumns = [
        { name: "Ticker", selector: "ticker", type: "string" },
        { name: "Number #", selector: "number", sortable: true, type: "number"},
        { name: "Value $", selector: "portfolioValue", sortable: true, type: "number" },
        { name: "Growth %", selector: "growth", sortable: true, type: "number"}
    ];

    const renderCell = (row: IStock, columnKey: React.Key) => {
        const cellValue = row[columnKey];

        switch(columnKey){
            case "ticker":
                return <Link href={"/stock/"+cellValue}>${cellValue}</Link>;
            case "growth":
                return( 
                <span style={cellValue > 0 ? {color: "#6fe3b4"} : {color: "#ff6961"}} >
                    {cellValue} %
                </span>
                );
            case "portfolioValue":
                return "$ " + cellValue;

            case "number":
                return "# " + cellValue;
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
                <Table.Body items={stocks}>

                    {(item) => (
                        <Table.Row key={item.key} css={{marginBottom: "5rem"}}>
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