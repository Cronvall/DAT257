import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";



const SignupPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);


  const signup = async () => {
    try{
      axios.post('http://localhost:8080/api/users',
      {
        username: username,
        password: password,
        email: email,
        userRoomStockLinks: []
      }).then((response) => {
        console.log(response);
        setUsername("");
        setPassword("");
        setEmail("");
        setRegisterSuccess(true)
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
          signup();
        }}
        className={styles.form}
      >
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input 
          name="username" 
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input 
          name="password" 
          className={styles.input} 
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input 
          name="email" 
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div>
          <button className={styles.button} type="submit">Sign up</button>
        </div>
      </form>
      <h1>{registerSuccess ? "Register Succeeded" : ""}</h1>
    </>
  );
};
export default SignupPage;