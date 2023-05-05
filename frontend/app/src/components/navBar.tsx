import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router"
import { logout, getCurrentUser } from "../services/auth.service";

import styles from './styles/navBar.module.css'

interface Iprops{
  transparent: boolean
}


const NavBar = (props: Iprops) => {

  const router: NextRouter = useRouter();
  


  const [transparent, setTransparent] = useState(props.transparent);
  const [bgColor, setBgColor] = useState(transparent ? "transparent" : "#f5f5f5");
  const [txtColor, setTxtColor] = useState(transparent ? "white" : "black");

  const [entered, setEntered] = useState("");

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [enteredUser, setEnteredUser] = useState("");   


  useEffect(() => {
    setSignedIn(!!getCurrentUser()?.username);
  }, []);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntered(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/stock/${entered}`);
    }
  };

  const handleInputChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredUser(event.target.value);
  };


  const handleEnterPressUser = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/profilepage/${enteredUser}`);
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
              className={styles.searchInput} placeholder="$AAPL"
              type="text"
              value={entered}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress} 
            />
            :
            <input
              className={styles.searchInputTransp} placeholder="$AAPL"
              type="text"
              value={entered}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress} 
            />
          }

{
            transparent ?
            <input
              className={styles.searchInput} placeholder="Enter user id"
              type="text"
              value={enteredUser}
              onChange={handleInputChangeUser}
              onKeyDown={handleEnterPressUser} 
            />
            :
            <input
              className={styles.searchInputTransp} placeholder="Enter user id"
              type="text"
              value={enteredUser}
              onChange={handleInputChangeUser}
              onKeyDown={handleEnterPressUser} 
            />
          }
          
          {
            signedIn|| null ?
            <>
              <button onClick={() => router.push('/myprofile')} className={styles.headerButton} style={{color: txtColor}}>{getCurrentUser()?.username}</button>
              <button onClick={() => { logout()}} className={styles.headerButton} style={{color: txtColor}}>Logout</button>
            </>
            :
            <>
              <button onClick={() => router.push('/register')} className={styles.headerButton} style={{color: txtColor}}>Register</button>
              <button onClick={() => router.push('/login')} className={styles.headerButton} style={{color: txtColor}}>Login</button>
            </>
          }
        </div>
      </div>
    )
  }

export default NavBar;