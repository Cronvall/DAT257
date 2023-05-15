import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { getCurrentUser } from "@/services/auth.service";
import NavBar from "@/components/navBar";
import { useRouter } from "next/router";
import { get } from "http";

const MyProfile = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [leagues, setLeagues] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (getCurrentUser()) {
      setSignedIn(true);
      getLeagues();
    }
  }, []);

  const getLeagues = () => {
    axios
      .get(`http://localhost:8080/api/rooms`, {
        params: { userId: getCurrentUser()?.id },
      })
      .then((res) => {
        console.log('rooms ', res.data);
        setLeagues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar transparent={false} />
      <div className={styles["profile-page"]}> {/* Add the wrapper div with the class name */}
        {signedIn || null ? (
          <>
            <h2 className={styles["profile-heading"]}>My Profile</h2>
            <label htmlFor="username" className={styles["profile-label"]}>
              Username: {getCurrentUser()?.username}
            </label>
            <label htmlFor="email" className={styles["profile-label"]}>
              Email: {getCurrentUser()?.email}
            </label>
            <label htmlFor="leagues" className={styles["profile-label"]}>
              Leagues:
            </label>
            <div>
            {leagues.map((league: any, index: number) => {
              // Find the member corresponding to the current user ID
              const member = league.members.find(
                (member: any) => member.id.userId === getCurrentUser()?.id
              );

              return (
                <div key={index}>
                  <button
                    className={styles["league-button"]}
                    onClick={() => router.push(`/room/${league.code}`)}
                  >
                    {league.name}
                  </button>
                  <div>
                    Stocks:
                    {member ? member.portfolio.stocks : "N/A"}
                    <br></br>
                    Increase: {member ? member.portfolio.percentageIncrease + '%': "N/A"}
                  </div>
                </div>
              );
            })}
          </div>
          </>
        ) : (
          <>
            <h2>You are not signed in.</h2>
          </>
        )}
      </div> {/* Close the wrapper div */}
    </>
  );
};

export default MyProfile;
