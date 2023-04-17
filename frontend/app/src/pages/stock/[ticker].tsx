import React, { useState } from "react";
import { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from 'axios';
const StockView: NextPage = () =>{
    
    const router = useRouter();
    const {ticker} = router.query;
    const [stockData, setStockData] = useState(null);
    
    const LookupStock = async (ticker: any) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/stocks/${ticker}`);
          console.log(response.data)
          return response.data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      };
      if (ticker) {
        LookupStock(ticker as string);
      }
    
        return (
            <div>
            <h1>Stock data:</h1>
                {stockData ? (
                    <pre>{JSON.stringify(stockData, null, 2)}</pre>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            
            
        )

            
        
            
};

export default StockView;