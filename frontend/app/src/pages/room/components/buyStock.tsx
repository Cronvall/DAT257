import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Router, { useRouter } from "next/router";


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

interface IProps {
    portfolioId: number | undefined;
}

const BuyStock = (props: IProps) => {

    const [currentStock, setCurrentStock] = useState<IstockData | undefined>(undefined);
    const [searchStock, setSearchStock] = useState<string>("");
    const [currentStockAmount, setCurrentStockAmount] = useState<number>(0);

    const router = useRouter();

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

    const handleBuyStock = () => {
        try{
            if(currentStock === undefined){
                console.log("No stock to buy")
                return;
            }
            if(currentStockAmount === 0 || currentStockAmount === undefined || 
                typeof currentStockAmount !== "number"){
                console.log("No amount to buy")
                return;
            }
            axios.put(`http://localhost:8080/api/portfolios/${props.portfolioId}/stocks/buy`, {
                ticker: currentStock.symbol,
                price: currentStock.currentPrice,
                amount: currentStockAmount
            })
            .then(res => {
                console.log(res.data)
                //Tempory solution since we don't fetch the new state of the database
                //router.reload();
            })
        }
        catch(e){
            console.log(e)
        }
    }


    const chartElements = () => {
        const trend = (array: number[]) =>(array[array.length - 1] - array[0]) / array.length;
        const trendData = currentStock?.historyPrices.map((x,i) => ({
            trend: i*trend(currentStock?.historyPrices)+currentStock?.historyPrices[0],
            price: x
        }))
        const min = currentStock !== undefined ? Math.min(...currentStock?.historyPrices) : 0;
        const max = currentStock !== undefined ? Math.max(...currentStock?.historyPrices) : 100;
        return(
            <div style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "75%",
                minHeight: "20rem",
                padding: "1.5rem",
            }}
            aria-label="stockChartContainer">
                <ResponsiveContainer width="100%" height="100%" aria-label="stockChart">
                <LineChart
                width={500}
                height={500}
                data={trendData}
                aria-label="stockChart"
                >
                    <Legend />
                    <XAxis dataKey="name" />
                    <YAxis 
                        type="number" 
                        domain={[min, max]}
                    />
                    <Line type="monotone" dataKey="price" stroke="#82CA9D" dot={false}/>
                    <Line type="monotone" dataKey="trend" stroke="#DEC018" strokeDasharray="2 2" dot={false}/>
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
                            padding: "1rem",
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
                        type="number"
                        value={currentStockAmount}
                        onChange={(e) => setCurrentStockAmount(+e.target.value)}
                        />
                        <Button onPress={handleBuyStock}>
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
            width: "50vw",
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
            alignItems:"flex-start",
            minWidth: "35rem",
            maxWidth: "525px",
            minHeight: "25rem",
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