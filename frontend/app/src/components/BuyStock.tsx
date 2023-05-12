import style from "./styles/buystock.module.css"
//s
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "@/services/auth.service";
import { NextPage } from "next";
import Dropdown from 'react-dropdown';


interface IBuyData {
    onClose: () => void;
    ticker: string;
    price: number;
  }
 
const BuyStock: NextPage<IBuyData> = ({ticker,price,onClose}) => {

  const [amount, setAmount] = useState<number | undefined>(0);
  const [buyPrice, setBuyPrice] = useState<number | undefined>(0);
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =parseInt(event.target.value);
    if (value > 0){
      setAmount(value ? value : undefined);
      setBuyPrice(price * value);
    }
    
  };



  const [portfolios, setPortfolios] = useState<string[]>([]);

  const LookupPortfoilos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooms?${getCurrentUser()?.id}`);
      
      let newPortfolios: string[] = [];
      response.data.forEach((room: any) => {
        room.members.forEach((port: any) => {
          if (port.id.userId === getCurrentUser()?.id) {
             const portfolioString = `${room.name}: ${port.portfolio.remainingBudget}$`;
             newPortfolios.push(portfolioString);
          }
  });
});
setPortfolios(newPortfolios);

    } catch (error) {
      console.log(error);
      throw error;
    }
    
  };
  useEffect(() => {
    LookupPortfoilos()
    
  }, []);
  console.log(portfolios)
   
    
    

    const onSelect= () =>{
        console.log("new")
    }
    const defaultOption = portfolios[0]
   
      

  return (
    <div className={style.modelpanel}>
      <div className={style.panelcontent}>
        <div className={style.centering}>
        <p className={style.ticker}>{ticker}</p>
        <p className={style.price}>{price} $</p>
        <Dropdown className={style.select} options={portfolios} onChange={onSelect} value={defaultOption} placeholder="Select an option" />

        <input className={style.amount} type="number" value={amount} onChange={handleNumberChange} placeholder="Amount" />
        <p className={style.cost} > {buyPrice}$</p>
        </div>
        <button onClick={onClose} className={style.button}>Close</button>
      </div>
      
    </div>
  );
};
export default BuyStock;

