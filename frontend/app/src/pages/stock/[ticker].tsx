import React, { useState, useEffect } from "react";
import { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from 'axios';
import styles from './stock.module.css';

const StockView: NextPage = () =>{
    interface IstockData {
        symbol: string
    }
    const router = useRouter();
    const {ticker} = router.query;
    const [stockData, setStockData] = useState<IstockData|undefined>(undefined);
    

    const LookupStock = async (ticker: any) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/stocks/${ticker}`);
          console.log("hej")
          setStockData(response.data);
        } catch (error) {
          console.log(error);
          throw error;
        }
        
      };
      useEffect(() => {
        if (ticker) {
          //LookupStock(ticker as string);
        }
      }, [ticker]);
    
        return (
            <div className={styles.back}>
                <p className={styles.rubric}>Apple Inc</p>
                <div className={styles.window}>
                    
                </div>

            </div>
            
            
            
        )

            
        
            
};

export default StockView;