import React, { useEffect } from "react";
import IMember from "../interfaces/IMember";
import { Table, Link, Button } from '@nextui-org/react'
import IStock from "../interfaces/IStock";

interface IProps {
    members: IMember[]
}

const OthersStocks = (props: IProps) => {
    const tableColumns = [
        { name: "Ticker", selector: "ticker", type: "string" },
        { name: "amount #", selector: "amount", sortable: true, type: "number"},
        { name: "Price $", selector: "current", sortable: true, type: "number" },
        { name: "Total $", selector: "total", sortable: true, type: "number"},
        { name: "profit", selector: "profit", sortable: true, type: "number"}
    ];

    const [currentTableData, setCurrentTableData] = React.useState<IMember>({} as IMember);
    const [tableRowsElements, setTableRowsElements] = React.useState<JSX.Element[]>([]);

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
        }
        return <></>
    };

    useEffect(() => {
        setCurrentTableData(props.members[0])
    }, [])

    useEffect(() => {
        console.log("currentTableData", currentTableData)
        if(currentTableData?.portfolio?.stocks){
            const tableRows = currentTableData?.portfolio?.stocks.map((stock) => {
                return (
                    <Table.Row key={stock.ticker} css={{marginBottom: "5rem"}}>
                        {(columnKey) => (
                            <Table.Cell key={columnKey}>
                                {renderCell(stock, columnKey)}
                            </Table.Cell>
                        )}
                    </Table.Row>
                )
            })
            setTableRowsElements(tableRows)
            console.log("tableRows", tableRows)
        }
    }, [currentTableData])

    const buttonStyle = {
        backgroundColor: "#F5F5F5",
        color: "#000000",
        border: "1px solid #d9d9d9",
        marginRight: "1rem"
    }

    return (
        <>
            <h2>Other Portfolios</h2>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
                width: "50%",
            }}>
                <Button size={"xs"} style={buttonStyle}> &lt;</Button>
                <h3>Kalle</h3>
                <Button size={"xs"} style={buttonStyle}> &gt;</Button>
            </div>
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
                <Table.Body items={currentTableData?.portfolio?.stocks || []}>
                    {tableRowsElements}
                </Table.Body>
            </Table>
        </>)
}

export default OthersStocks