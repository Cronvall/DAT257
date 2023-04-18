import React, { useState, useEffect } from "react";
import { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from 'axios';
import styles from './stock.module.css';
import flag from '../../assets/images/us-flag.png'
import Header from '../../components/navBar';
import Image from 'next/image'
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
            <><Header />
            <div className={styles.back}>
              <div className={styles.row}> 
                <p className={styles.rubric}>Apple Inc</p>
                <Image src={flag} alt="example" width={25} height={15} className={styles.flag}/>
                <p className={styles.exchange}>Nasdaq</p>
              </div>
            
              <div className={styles.window}>

              </div>

            </div></>
            
    
        )
          
};

export default StockView;