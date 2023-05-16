import React from 'react';
import axios from 'axios';
import { Table, Link, Button, Modal, Input } from '@nextui-org/react'
import IStock from '../interfaces/IStock';


interface IProps{
    stocks: IStock[];
    currentPortfolio: number;
}

const StocksTable = (props: IProps) => {

    const tableColumns = [
        { name: "Ticker", selector: "ticker", type: "string" },
        { name: "amount #", selector: "amount", sortable: true, type: "number"},
        { name: "Price $", selector: "current", sortable: true, type: "number" },
        { name: "Total $", selector: "total", sortable: true, type: "number"},
        { name: "profit", selector: "profit", sortable: true, type: "number"},
        { name: "", selector: "sell", sortable: true, type: "string"}
    ];

    const [sellModalOpen, setSellModalOpen] = React.useState(false);
    const [sellTicker, setSellTicker] = React.useState("");
    const [sellAmount, setSellAmount] = React.useState(0);
    const [amountMax, setAmountMax] = React.useState(0);

    const handleSellOrder = async () => {
        console.log("Sell info: " + sellTicker + " amount; " + sellAmount + " price;" + props.stocks.find((stock) => stock.ticker === sellTicker)?.current);
        axios.put(`http://localhost:8080/api/portfolios/${props.currentPortfolio}/stocks/sell`, {
            ticker: sellTicker,
            amount: sellAmount,
            price: props.stocks.find((stock) => stock.ticker === sellTicker)?.current
            }).then(res => {
                console.log(res.data);
                setSellModalOpen(false);
            })
    };

    const openSellModal = (ticker: string, amtMax: number) => {
        setSellTicker(ticker);
        setSellModalOpen(true);
        setAmountMax(amtMax);
        console.log("Opening sell modal for " + ticker);
        console.log("Max amount: " + amtMax);
    };

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
                return "$" + cellValue;

            case "amount":
                return cellValue;

            case "total":
                return "$" + (row.current * row.amount).toFixed(2);
            
            case "sell":
                return( 
                <Button 
                    auto
                    style={{backgroundColor: "#ff6961", color: "white"}}
                    onPress={() => openSellModal(row.ticker, row.amount)}
                >
                    Sell</Button>
                );
        }
    };

    return (
        <>
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={sellModalOpen}
            onClose={() => setSellModalOpen(false)}
          >
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
            <h1>Sell ${sellTicker} stock</h1>
            <div style={{display: "flex", flexDirection: "row", alignContent:"center", gap:"1rem"}}>
                <Input
                    clearable
                    bordered
                    color="primary"
                    width='60%'
                    placeholder="Amount"
                    aria-label='Amount'
                    type='number'
                    min={1}
                    max={amountMax}
                    onChange={(e) => setSellAmount(parseInt(e.target.value))}
                />
                <h2 style={{marginTop:"0.25rem"}}>of {amountMax}</h2>
            </div>

            </Modal.Body>
            <Modal.Footer>
            <Button auto color="primary" onPress={() => setSellModalOpen(false)}>
                Close
            </Button>
            <Button auto  color="error" onPress={() => handleSellOrder()}>
                Sell
            </Button>
            </Modal.Footer>
        </Modal>

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
                    <Table.Pagination rowsPerPage={5} />
            </Table>
        </>
    );
};

export default StocksTable;