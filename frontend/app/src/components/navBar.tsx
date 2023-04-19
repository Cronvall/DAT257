import React, { useState } from "react";
import { NextRouter, useRouter } from "next/router"

import styles from './styles/navBar.module.css'




const NavBar = (props: {transparent: boolean}) => {
    const router: NextRouter = useRouter();


    const [transparent, setTransparent] = useState(props.transparent);
    const [bgColor, setBgColor] = useState(transparent ? "transparent" : "#f5f5f5");
    const [txtColor, setTxtColor] = useState(transparent ? "white" : "black");

    const [entered, setEntered] = useState("");


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntered(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/stock/${entered}`);
    }
  };


    return (
      <div className={styles.navBar} style={{background: bgColor, color: txtColor}}>
        <button onClick={() =>  router.push('/')} className={styles.headerTxtBtn}>
            <h1 style={{color: txtColor}}>Wall St. Warriors</h1>
        </button>

        

        
        <div>
          {
            transparent ?
            <input
        className={styles.searchInput} placeholder="$APPL"
        type="text"
        value={entered}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress} />
            :
            <></>
          }
          
          {/*Make dynamic (Don't render if user is signed in*/}
          <button onClick={() => router.push('/register')} className={styles.headerButton} style={{color: txtColor}}>Register</button>
          <button onClick={() => router.push('/login')} className={styles.headerButton} style={{color: txtColor}}>Login</button>
        </div>
      </div>
    )
  }

export default NavBar;