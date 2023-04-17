import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";



const SignupPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const signup = async () => {
    try{
      axios.post('http://localhost:8080/api/users',
      {
        username: username,
        password: password
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
        
        <div>
          <button className={styles.button} onClick={signup}>Sign up</button>
        </div>
      </form>
    </>
  );
};
export default SignupPage;