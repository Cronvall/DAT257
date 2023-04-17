import { NextRouter, useRouter } from "next/router"
import styles from '../styles/navBar.module.css'

const navBar = () => {
    const router: NextRouter = useRouter();
    return (
      <div className={styles.navBar}>
        <button onClick={() =>  router.push('/')} className={styles.headerTxtBtn}>
            <h1>Wall St. Warriors</h1>
        </button>
        <input className={styles.searchInput} placeholder="$APPL"></input>
        <div>
          {/*Make dynamic (Don't render if user is signed in*/}
          <button onClick={() => router.push('/register')} className={styles.headerButton}>Register</button>
          <button onClick={() => router.push('/login')} className={styles.headerButton}>Login</button>
        </div>
      </div>
    )
  }

export default navBar;