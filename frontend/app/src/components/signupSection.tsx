import React, { useState } from "react";
import styles from "./styles/singupSection.module.css"
import axios from "axios";
import rightArrow from "./../assets/icons/right-arrow.svg";
import Image from "next/image";

const SignupSection = () => {

    const [roomCode, setRoomCode] = useState("");
    
    // should be dynamic and depending on if user is signed in or not
    const [enterLeagueCode, setEnterLeagueCode] = useState(true);


    const joinRoom = async () => {
        console.log(roomCode)
        try{
          axios.post('http://localhost:8080/api/rooms',
          {
            code: roomCode,
          })
        }
        catch(e){
          console.log(e)
        }
      };

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.header}>Wall St. Warriors</h1>
            <div className={styles.underRowContainer}>
                <h2 className={styles.underRow}>The stock trading playground</h2>
                <h2 className={styles.underRow}>for you and your friends</h2>
            </div>

            <div className={styles.buttonContainer}>
                <div className={styles.buttonWrapper}>
                    <button className={styles.button}>Sign Up</button>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.button}>Join League</button>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.button}>Create League</button>
                </div>                    
            </div>
            {
                enterLeagueCode ?
                <div className={styles.codeContainer}>
                    <input className={styles.codeInput} type="text" placeholder="Enter League Code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
                    <div className={styles.wrapper}>

                    <button onClick={joinRoom} className={styles.button}>
                    <Image
                        src={rightArrow}
                        alt="right arrow"
                        width={48}
                        height={48}
                    />
                    </button>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
};

export default SignupSection;