import style from "./style.module.css"
import React, { useState } from "react";
import axios from "axios";

import Header from '../../components/Header';
import Body from './Body';


const HomePage = () => {

  const [code, setCode] = useState(true);




  return (
    <>
    <Header />
    <Body />

    </>
  );
};
export default HomePage;

