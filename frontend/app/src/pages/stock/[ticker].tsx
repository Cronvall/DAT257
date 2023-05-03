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
import StockGraph from "../../components/StockGraph";
import { logout, getCurrentUser } from "../../services/auth.service";
import BuyStock from "../../components/BuyStock";




const StockView: NextPage = () =>{
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
    const router = useRouter();
    const {ticker} = router.query;
    const [stockData, setStockData] = useState<IstockData|undefined>(undefined);
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [showModelPanel, setShowModelPanel] = useState(false);
    
    
  
    const handleCloseModelPanel = () => {
      setShowModelPanel(false);
    };
    useEffect(() => {
      setSignedIn(!!getCurrentUser()?.username);
    }, []);

    const buysellButton = () => {
      if (!signedIn){
        router.push(`/login`)
      } else{
        setShowModelPanel(true)

      }
    };
  

    

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
                        <td><p className={styles.price} style={stockData?.todayProcent !== undefined ? { color: stockData.todayProcent >= 0 ? 'green' : 'red' } : undefined}>
                            {stockData?.todayProcent}%</p></td>
                        <td><p className={styles.price} style={stockData?.todayChange !== undefined ? { color: stockData.todayChange >= 0 ? 'green' : 'red' } : undefined} >
                                {stockData?.todayChange}$
                            </p></td>
                        <td><p className={styles.price} >{stockData?.openPrice}$</p></td>
                    </tr>
                        

                </table>
                </div>
                <div className={styles.buySell}>
                    <button className={styles.buttonbuysell}
                            style={{background:'#24a0ed'}}
                            onClick={buysellButton}>
                              
                        Buy
                    </button>
                    <button className={styles.buttonbuysell}
                            style={{background:'red'}}
                            onClick={buysellButton}>
                            
                        Sell
                    </button>

                </div>

                
                <div className={styles.graphDiv}>
                  <StockGraph prices={stockData?.historyPrices ? stockData?.historyPrices: [] } dates={stockData?.historyDates ? stockData?.historyDates: []} />
                </div>
              </div>
              {showModelPanel && <BuyStock onClose={handleCloseModelPanel} ticker={stockData?.symbol} price={stockData?.currentPrice} />}
            </div></>
            
            
    
        )
          
};

export default StockView;