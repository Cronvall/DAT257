import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { getCurrentUser } from "@/services/auth.service";
import NavBar from "@/components/navBar";
import { useRouter } from "next/router";
import { get } from "http";


const MyProfile = () => {
  //Should be dynamic
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [leagues, setLeagues] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (getCurrentUser()) { setSignedIn(true); getLeagues();}
    // if (signedIn) {
    //   axios
    //     .get(`http://localhost:8080/api/rooms`, { params: { userId: getCurrentUser()?.id } })
    //     .then((res) => {
    //       console.log(res.data);
    //       setLeagues(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  },[]);

  const getLeagues = () => {
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

  return (
    <>
      <NavBar transparent={false} />
        { signedIn || null ?
          <>
           <h2>Profile Page</h2>
            <label htmlFor="username">Username: {getCurrentUser()?.username}</label> 
            {/* <tr></tr> */}
            <label htmlFor="email">Email: {getCurrentUser()?.email}</label>
            {/* <tr></tr> */}
            <label htmlFor="leagues">Leagues: </label>
              {leagues.map((league: any, index: number) => (
                <button
                  key={index}
                  onClick={() => router.push(`/room/${league.id}`)}
                  >
                  {league.name}
                </button>
        ))}
          </>
            :<>
              <h2>You are not signed in.</h2>
             </>
        }

    </>
  );
};

export default MyProfile;
