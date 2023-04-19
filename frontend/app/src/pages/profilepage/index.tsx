import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
import {loggedInId} from "../login/index";

const ProfilePage = () => {
  const [userId, setUserId] = useState(loggedInId); //Här bör man kunna använda input från login-page
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [userId]);



  // Showing user id: {userId} ska inte synas på sidan
  return (
    <>
      <form className={styles.form}>
        <h2>Profile Page (for user id: {userId})</h2> 
        <label htmlFor="username">Username: {username}</label>
        <label htmlFor="email">Email: {email}</label>
       {/* { <div>
          <input type="text" placeholder="Enter league code" />
          <button type="submit"> Join League </button>  
        </div>} */}
      </form>
    </>
  );
};

export default ProfilePage;
