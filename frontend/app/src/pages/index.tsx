import { useRouter } from "next/router"
import styles from './style.module.css'

export default function Home() {

  const router = useRouter()
  return (
    <> 
      <h1>Welcome to Wallstreet Warriors!</h1>
      <h2>The fantasy stock league for you and your friends</h2>
      <img src="pages\images\WallstreetWarriors.png" alt="Wallstreet warrior" className={styles.logo} />
      <button className={styles.button} onClick={() => router.push('/login')}>Login</button>
      <button className={styles.button} onClick={() => router.push('/register')}>Register</button>
    </>
  )
}
