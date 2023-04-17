import React, { useState } from 'react';
import styles from './style.module.css';
import axios from 'axios';
import { useRouter } from "next/router"

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let lastIO = Date.now();
  const [failedLogin, setFailedLogin] = useState(false);
  const router = useRouter()

  const login = () => {
    if (lastIO + 1000 > Date.now()) return;
    lastIO = Date.now();
    axios
      .post('http://localhost:8080/api/authentication', {
        username: username,
        password: password,
      })
      .then((response) => {
        if(response.status >= 200 && response.status <= 299){
          let id = response.data.id; 
          // router.push('/profilepage/');
        }
        setUsername('');
        setPassword('');
      })
      .catch((error) => {
        setFailedLogin(true);
        if (error.response) {
          // The request was made and the server responded with a status code outside the range of 2xx
          console.log(error.response.data);
          // Show a popup with the error message
          // alert(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          // alert('No response from server');
        } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error', error.message);
          // alert('Error during request setup');
        }
      });
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
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={login}>
          Login
        </button>
        <h1>{failedLogin ? "Invalid password or username" : ""}</h1>
      </form>
    </>
  );
};
export default LoginPage;