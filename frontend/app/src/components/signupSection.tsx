import React, { useState } from "react";
import styles from "./styles/singupSection.module.css"
import axios from "axios";
import { NextRouter } from "next/router";
import HoloButton from "./buttons/holoButton";

const SignupSection = (props : {router: NextRouter}) => {

    const [roomCode, setRoomCode] = useState("");
    
    // should be dynamic and depending on if user is signed in or not
    const [enterLeagueCode, setEnterLeagueCode] = useState(false);


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
                <HoloButton 
                    onClick={() => props.router.push("./register")} txt="Sign Up" 
                    width="16rem" height="6rem"/>
                <HoloButton 
                    onClick={() => setEnterLeagueCode(!enterLeagueCode)} txt="Join League" 
                    width="16rem" height="6rem"/>    
                <HoloButton 
                    onClick={() => setEnterLeagueCode(!enterLeagueCode)} txt="Create League" 
                    width="16rem" height="6rem"/>                   
            </div>
            <div className={styles.inputSpace}>
                {
                    enterLeagueCode ?
                    <div className={styles.codeContainer}>
                        <input 
                            className={styles.codeInput} type="text" 
                            placeholder="Enter League Code" value={roomCode} 
                            onChange={(e) => setRoomCode(e.target.value)} />
                        <div className={styles.wrapper}>
                        
                        <HoloButton 
                            onClick={joinRoom} 
                            width="10rem"
                            height="4rem"
                            txt="Go"
                            rightArrow={true}
                        />
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    );
};

export default SignupSection;