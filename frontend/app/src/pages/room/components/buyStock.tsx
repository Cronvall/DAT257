import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, CartesianGrid, Tooltip } from "recharts";


interface IstockData {
    symbol: string,
    exchange: string,
    openPrice: number,
    currentPrice: number,
    todayProcent: number,
    todayChange: number
    historyPrices : Array<number>
    historyDates : Array<string>
}

const BuyStock = () => {

    const [currentStock, setCurrentStock] = useState<IstockData | undefined>(undefined);
    const [searchStock, setSearchStock] = useState<string>("");

    const handleSearchStock = () => {
        try{
            if(searchStock === ""){
                console.log("No stock to search")
                return;
            }
            axios.get(`http://localhost:8080/api/stocks/${searchStock}`)
            .then(res => {
                console.log(res.data)
                setCurrentStock(res.data);
            })
        }
        catch(e){
            console.log(e)
        }
    }

    const chartElements = () => {
        const trend = (array: number[]) =>(array[array.length - 1] - array[0]) / array.length;
        const trendData = currentStock?.historyPrices.map((x,i) => ({
            ev: i*trend(currentStock?.historyPrices)+currentStock?.historyPrices[0],
            pv: x
        }))
        return(
            <div style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "75%",
            }}
            aria-label="stockChartContainer">
                <ResponsiveContainer width="100%" height="100%" aria-label="stockChart">
                <LineChart
                width={500}
                height={300}
                data={trendData}
                aria-label="stockChart"
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="pv" stroke="#82CA9D" dot={false}/>
                    <Line type="monotone" dataKey="ev" stroke="#DEC018" strokeDasharray="2 2" dot={false}/>
                </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }

    const stockInfo = () => {
        if(currentStock != undefined){
            return(
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    height: "75%",
                    padding: "0.5rem",
                }}
                aria-label="stockContainer">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "25%",
                    }}
                    aria-label="stockNameContainer">
                        <h1 style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            padding: "2rem",
                        }}
                        aria-label="stockName">
                            {currentStock?.symbol}
                        </h1>
                        <h1 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            padding: "2rem",
                        }}
                        aria-label="stockPrice">
                            ${currentStock?.currentPrice}
                        </h1>
                        <Input
                        placeholder="   1"
                        width="20%"
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: "15px",
                        }}
                        aria-label="stockAmount"
                        />
                        <Button>
                            Buy
                        </Button>
                    </div>
                    {chartElements()}
                </div>
            )
        }
    }


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "30vh",
            width: "50vw",
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
            margin: "2rem",
            alignItems:"flex-start",
            minWidth: "35rem"
        }}
        aria-label="mainContainer">
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                height: "25%",
                padding: "0.5rem",
            }}
            aria-label="searchContainer">
                <Input 
                placeholder="   $NFLX" 
                width="50%" 
                style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "15px",
                }}
                aria-label="search field"
                value={searchStock}
                onChange={(e) => setSearchStock(e.target.value)}
                />
                <Button auto onPress={handleSearchStock} aria-label="search button">
                    Search
                </Button>
            </div>
            {stockInfo()}
        </div>
    )
}
    
export default BuyStock;