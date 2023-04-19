import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../pages/stock/stock.module.css'
import router from "next/router";


const InputStock = () => {



    const [entered, setEntered] = useState("");


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEntered(event.target.value);
    };
  
    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        
        router.push(`/stock/${entered}`);
        setEntered("")
      }
    }
    
    

     

    return(
        <div className={styles.inputDiv}>
             <input
        className={styles.searchInput} placeholder="$APPL"
        type="text"
        value={entered}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress} />
        </div>
    );

};
export default InputStock;