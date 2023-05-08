import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { getCurrentUser } from "@/services/auth.service";
import NavBar from "@/components/navBar";
import router from "next/router";


const MyProfile = () => {
  //Should be dynamic
  const [signedIn, setSignedIn] = useState<boolean>(true);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    if (signedIn) {
      axios
        .get(`http://localhost:8080/api/rooms`, { params: { userId: getCurrentUser()?.id } })
        .then((res) => {
          console.log(res.data);
          setLeagues(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[]);

  return (
    <>
      <NavBar transparent={false} />
      <form className={styles.form}>
        <h2>Profile Page</h2>
        { signedIn || null ?
          <>
            <label htmlFor="username">Username: {getCurrentUser()?.username}</label>
            <label htmlFor="email">Email: {getCurrentUser()?.email}</label>
          </>
            :<></>
        }
        <label htmlFor="leagues">Leagues: </label>
        {leagues.map((league: any, index: number) => (
          <button
            key={index}
            onClick={() => router.push(`/room/${league.id}`)}
          >
            {league.name}
          </button>
        ))}
      </form>

    </>
  );
};

export default MyProfile;
