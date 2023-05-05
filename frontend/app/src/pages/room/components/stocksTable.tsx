import React, { useEffect } from 'react';
import style from './style.module.css'
import { Table, Link } from '@nextui-org/react'
import { useRouter } from 'next/router';

interface IStock{
    ticker: string;
    name: string;
    number: number;
    portfolioValue: number;
    growth: number;
}




const StocksTable = () => {

    const router = useRouter();

    //Remove prepopulated users when backend is ready
    const [stocks, setStocks] = React.useState<IStock[]>([
        {
            name: "Alphabet",
            ticker: "GOOGL",
            number: 5,
            portfolioValue: 2000,
            growth: -80,
        },
        {
            name: "META",
            ticker: "META",
            number: 3,
            portfolioValue: 6000,
            growth: -40
        },
        {
            name: "Tesla",
            ticker: "TSLA",
            number: 2,
            portfolioValue: 15000,
            growth: 50
        },
        {
            name: "Apple",
            ticker: "AAPL",
            number: 1,
            portfolioValue: 1100,
            growth: 10
        }
    ]);

    const tableColumns = [
        { name: "Company", selector: "Company", type: "string" },
        { name: "Ticker", selector: "Ticker", type: "string" },
        { name: "Number #", selector: "Number", sortable: true, type: "number"},
        { name: "Value $", selector: "Value", sortable: true, type: "number" },
        { name: "Growth %", selector: "growth", sortable: true, type: "number"}
    ];
            

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
                        {
                            (item) => (
                                <Table.Row key={item.ticker} css={
                                    {
                                    marginBottom: "5rem",
                                }}>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell >
                                       <Link href={"/stock/"+item.ticker}>${item.ticker}</Link> 
                                    </Table.Cell>
                                    <Table.Cell>{item.number}</Table.Cell>
                                    <Table.Cell>$ {item.portfolioValue}</Table.Cell>
                                    <Table.Cell css={item.growth > 0 ?
                                         {color: "#6fe3b4"} : {color: "#ff6961"}}
                                    >
                                        {item.growth} %
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }
                </Table.Body>
            </Table>
        </>
    );
};

export default StocksTable;