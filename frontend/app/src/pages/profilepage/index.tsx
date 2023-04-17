import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(1);

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

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.target.value));
  };

  return (
    <>
      <form className={styles.form}>
        <h1>Profile Page</h1>
        <label htmlFor="userId">User ID</label>
        <input
          type="number"
          name="userId"
          className={styles.value}
          value={userId}
          onChange={handleUserIdChange}
        />
        <label htmlFor="username">Username</label>
        <input
          name="username"
          className={styles.value}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          className={styles.value}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <button className={styles.button}>Join league</button>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
