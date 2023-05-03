import style from "./styles/buystock.module.css"
//s
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/services/auth.service";
import { NextPage } from "next";
import Dropdown from 'react-dropdown';


interface IBuyData {
    onClose: () => void;
    ticker: string;
    price: number;
  }
 
const BuyStock: NextPage<IBuyData> = ({ticker,price,onClose}) => {

    
   
   
    
    const options = [
      'one', 'two', 'three'
    ];

    const onSelect= () =>{
        console.log("new")
    }
    const defaultOption = options[0];
   
      

  return (
    <div className={style.modelpanel}>
      <div className={style.panelcontent}>
        <div className={style.centering}>
        <p className={style.ticker}>{ticker}</p>
        <p className={style.price}>{price} $</p>
        <Dropdown className={style.select} options={options} onChange={onSelect} value={defaultOption} placeholder="Select an option" />
        </div>
        <button onClick={onClose} className={style.button}>Close</button>
      </div>
      
    </div>
  );
};
export default BuyStock;

