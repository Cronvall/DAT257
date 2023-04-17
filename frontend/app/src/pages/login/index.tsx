import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { useAuth, AuthProvider, LocalStorageProvider } from "@reactivers/hooks";


const SignupPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);


  const signup = async () => {

    if(username === "" || password === ""){
      alert("Please fill in all fields");
      return;
    }
    try{axios.get('http://localhost:8080/api/users/'+username).then((response) => {
        console.log(response);
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
        <h1>Login</h1>
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
        
        <div>
          <button className={styles.button} type="submit">Login</button>
        </div>
      </form>
      <h1>{registerSuccess ? "Register Succeeded" : ""}</h1>
    </>
  );
};
export default SignupPage;