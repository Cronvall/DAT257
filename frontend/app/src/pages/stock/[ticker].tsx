import React, { useState, useEffect } from "react";
import { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from 'axios';
import styles from './stock.module.css';
import flag from '../../assets/images/us-flag.png'
import Header from '../../components/navBar';
import Image from 'next/image'
import Search from '../../components/InputStock'
import InputStock from "../../components/InputStock";
const StockView: NextPage = () =>{
    interface IstockData {
        symbol: string,
        exchange: string,
        openPrice: number,
        currentPrice: number,
        todayProcent: number,
        todayChange: number

    }
    const router = useRouter();
    const {ticker} = router.query;
    const [stockData, setStockData] = useState<IstockData|undefined>(undefined);
    

    const LookupStock = async (ticker: any) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/stocks/${ticker}`);
          
          setStockData(response.data);
        } catch (error) {
          console.log(error);
          throw error;
        }
        
      };
      useEffect(() => {
        if (ticker) {
          LookupStock(ticker as string);
        }
      }, [ticker]);
    
        return (
            <><Header transparent={false} />
            
            <InputStock />


            <div className={styles.back}>
              <div className={styles.row}> 
                <p className={styles.rubric}>{stockData?.symbol}</p>
                <Image src={flag} alt="example" width={25} height={15} className={styles.flag}/>
                <p className={styles.exchange}>{stockData?.exchange}</p>
              </div>
            
              <div className={styles.window}>
                <div className={styles.priceInfo}>
                <table>
                    <tr>
                        <th><p className={styles.infoText}>Latest</p></th>
                        <th><p className={styles.infoText}>Today%</p></th>
                        <th><p className={styles.infoText}>Today+/-</p></th>
                        <th><p className={styles.infoText}>Open</p></th>
                    </tr>
                    <tr>
                        <td><p className={styles.price}>{stockData?.currentPrice}$</p></td>
                        <td><p className={styles.price} style={{color:'green'}}>{stockData?.todayProcent}%</p></td>
                        <td><p className={styles.price} style={{color:'green'}}>{stockData?.todayChange}$</p></td>
                        <td><p className={styles.price} >{stockData?.openPrice}$</p></td>
                    </tr>
                        

                </table>
                </div>
                <div className={styles.buySell}>
                    <button className={styles.buttonbuysell}
                            style={{background:'#24a0ed'}}>
                        Buy
                    </button>
                    <button className={styles.buttonbuysell}
                            style={{background:'red'}}>
                        Sell
                    </button>
                    
                </div>
                

                
              </div>

            </div></>
            
    
        )
          
};

export default StockView;