import React, { useState } from 'react'
import styles from './style.module.css'
import axios from "axios";

const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let lastIO = Date.now();


  const login = async () => {
    try{
      if(lastIO + 1000 > Date.now()) return;
      lastIO = Date.now();
      axios.post('http://localhost:8080/api/authentication',
      {
        username: username,
        password: password
      }).then((response) => {
        console.log(response);
        setUsername("");
        setPassword("");
      })

    }
    catch(e){
      console.log(e)
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className={styles.form}
      >
        <h1>Login</h1>
        <input 
          name="username" 
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          name="password" 
          className={styles.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* <div> */}
          <button className={styles.button} onClick={login}>Login</button>
        {/* </div> */}
      </form>
    </>
  );
};
export default LoginPage;