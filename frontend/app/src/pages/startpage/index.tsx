import style from "./style.module.css"
import React, { useState } from "react";
import axios from "axios";

import Body from './Body';


const HomePage = () => {

  const [code, setCode] = useState(true);



  return (
    <>
    <Body />
    </>
  );
};
export default HomePage;

