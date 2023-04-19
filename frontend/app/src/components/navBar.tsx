import { NextRouter, useRouter } from "next/router"
import styles from '../styles/navBar.module.css'
import React , { useState} from 'react';

const navBar = () => {
    const router: NextRouter = useRouter();

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
      <div className={styles.navBar}>
        <button onClick={() =>  router.push('/')} className={styles.headerTxtBtn}>
            <h1>Wall St. Warriors</h1>
        </button>
        <input
        className={styles.searchInput} placeholder="$APPL"
        type="text"
        value={entered}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress} />
        
        <div>
          {/*Make dynamic (Don't render if user is signed in*/}
          <button onClick={() => router.push('/register')} className={styles.headerButton}>Register</button>
          <button onClick={() => router.push('/login')} className={styles.headerButton}>Login</button>
        </div>
      </div>
    )
  }

export default navBar;