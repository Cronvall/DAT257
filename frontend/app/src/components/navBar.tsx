import React, { useState } from "react";
import { NextRouter, useRouter } from "next/router"
import styles from './styles/navBar.module.css'

const NavBar = (props: {transparent: boolean}) => {
    const router: NextRouter = useRouter();

    const [transparent, setTransparent] = useState(props.transparent);
    const [bgColor, setBgColor] = useState(transparent ? "transparent" : "#f5f5f5");
    const [txtColor, setTxtColor] = useState(transparent ? "white" : "black");

    return (
      <div className={styles.navBar} style={{background: bgColor, color: txtColor}}>
        <button onClick={() =>  router.push('/')} className={styles.headerTxtBtn}>
            <h1 style={{color: txtColor}}>Wall St. Warriors</h1>
        </button>
        
        <div>
          {
            transparent ?
            <input className={styles.searchInput} placeholder="$APPL"></input>
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