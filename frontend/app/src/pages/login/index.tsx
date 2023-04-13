import React, { useState } from 'react'
import styles from './style.module.css'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  //DUNNO
  const login = async () => {
    // //What to do with information from Login
    // const response = await fetch('http://localhost:8080/api/login', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password
    //   })
    // })
    // return response.json()
  }

  return (
    <>
        <form className={styles.form}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            className={styles.input}
            id="username" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className={styles.input}
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

        <button 
          className={styles.button}
          onClick={() => login()}> Login </button>

        </form>
    </>
  )
}