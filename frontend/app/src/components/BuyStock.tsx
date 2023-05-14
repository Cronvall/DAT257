import style from "./styles/buystock.module.css"
//s
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { getCurrentUser } from "@/services/auth.service";
import { NextPage } from "next";

import { Select } from "@chakra-ui/react";


interface IBuyData {
    onClose: () => void;
    ticker: string;
    price: number;
  }
  interface buyRequest{
    symbol: string;
    price: number;
    amount?: number;
  }
  interface Option {
    label: string;
    value: string;
  }

 
const BuyStock: NextPage<IBuyData> = ({ticker,price,onClose}) => {
  const [mounted, setMounted] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(0);
  const [buyPrice, setBuyPrice] = useState<number | undefined>(0);
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =parseInt(event.target.value);
    if (value > 0){
      setAmount(value ? value : undefined);
      setBuyPrice(price * value);
    }
    
  };

  const [portfolios, setPortfolios] = useState<Option[]>([]);
  const [defValue, setDefValue] = useState("");
  
  const LookupPortfolios = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooms?${getCurrentUser()?.id}`);
      const newPortfolios = response.data.reduce((acc: Option[], room: any) => {
        room.members.forEach((port: any) => {
          if (port.id.userId === getCurrentUser()?.id) {
            const portfolioString: Option = {
              label: `${room.name}: ${port.portfolio.remainingBudget}$`,
              value: port.id.roomId
            };
            if (!acc.some((option) => option.label === portfolioString.label)) {
              acc.push(portfolioString);
            }
          }
        });
        return acc;
      }, []);
      setPortfolios(newPortfolios);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  useEffect(() => {
    LookupPortfolios();
  }, []);

   
    

    const onSelect= (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setDefValue(event?.target.value);
        
        console.log(defValue)
    }
   
    const buyButton = async () => {
      let transaction :buyRequest = {
        symbol: ticker,
        price: price,
        amount: amount
      }
      
      try {
        axios
        .put(`http://localhost:8080/api/portfolios/${defValue}/stocks/buy`,transaction )
        .then((response: AxiosResponse) => {
          console.log("Stock buy order successful", response.data);
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
      onClose()
    };

    const sellButton = async () => {
      let transaction :buyRequest = {
        symbol: ticker,
        price: price,
        amount: amount
      }
      
      try {
        axios
        .put(`http://localhost:8080/api/portfolios/${defValue}/stocks/sell`,transaction )
        .then((response: AxiosResponse) => {
          console.log("Stock buy order successful", response.data);
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
      
    };
  

  return (
    <div className={style.modelpanel}>
      <div className={style.panelcontent}>
        <div className={style.centering}>
        <p className={style.ticker}>{ticker}</p>
        <p className={style.price}>{price} $</p>
        

        <input className={style.amount} type="number" value={amount} onChange={handleNumberChange} placeholder="Amount" />
        <p className={style.cost} > {buyPrice}$</p>
        <Select
          className={style.select}
          placeholder="Select an option"
          value={defValue}
          onChange={onSelect}
          >
          {portfolios.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
          ))}
          </Select>
        <button onClick={buyButton} className={style.buybutton}>Buy</button>
        <button onClick={sellButton} className={style.sellbutton}>Sell</button>
        </div>
        <button onClick={onClose} className={style.button}>Close</button>

      </div>

      
    </div>
  );
};
export default BuyStock;

