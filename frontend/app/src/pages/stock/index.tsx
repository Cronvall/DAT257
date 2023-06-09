import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { NextPage } from 'next';
import { useRouter } from "next/router";
import Header from '../../components/navBar';
import InputStock from "../../components/InputStock";
const StockView: NextPage = () => {

const [entered, setEntered] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntered(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/stock/${entered}`);
    }
  };    

  

  return (
    <><Header transparent={false} /><InputStock /></>
      
     
  );
};
export default StockView;