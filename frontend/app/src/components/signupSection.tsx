import React, { useEffect, useState } from "react";
import styles from "./styles/singupSection.module.css"
import axios from "axios";
import { NextRouter,useRouter } from "next/router";
import HoloButton from "./buttons/holoButton";
import { getCurrentUser } from "../services/auth.service";
import CreateRoomPanel from "./createRoom";


const SignupSection = (props : {router: NextRouter}) => {

    const router = useRouter();
    const user = getCurrentUser();


    const [roomCode, setRoomCode] = useState("");
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [createRoom, setCreateRoom] = useState(false);

    // should be dynamic and depending on if user is signed in or not
    const [enterLeagueCode, setEnterLeagueCode] = useState(false);


    useEffect(() => {
        setSignedIn(!!getCurrentUser()?.username);
    
    }, []);

    const handleJoinRoom = async () => {
        const user = getCurrentUser();
        
        try{
            const respone = await axios.post(`http://localhost:8080/api/rooms/${roomCode}`,
            {
              id: user.id,
              username: user.username,
              password: user.password,
              email: user.email
            });
            console.log(respone.data)
          }
          catch(e){
            console.log(e)
          }
        

        router.push(`/room/${roomCode}`,)
      };

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.header}>Wall St. Warriors</h1>
            <div className={styles.underRowContainer}>
                <h2 className={styles.underRow}>The stock trading playground</h2>
                <h2 className={styles.underRow}>for you and your friends</h2>
            </div>

            <div className={styles.buttonContainer}>
                {
                    signedIn ?
                    <>
                        <HoloButton 
                            onClick={() => setEnterLeagueCode(!enterLeagueCode)} txt="Join League" 
                            width="16rem" height="6rem"/>
                        <HoloButton 
                            onClick={() => setCreateRoom(!createRoom)} txt="Create League" 
                            width="16rem" height="6rem"/>  
                        {
                        createRoom ? 
                            <CreateRoomPanel closeMethod={() => setCreateRoom(false)}/>
                            :
                            <></>
                        }
                         
                    </>
                    :
                    <>
                        <HoloButton 
                            onClick={() => props.router.push("./register")} txt="Sign Up" 
                            width="16rem" height="6rem"/>
                        <HoloButton 
                            onClick={() => props.router.push("/login")} txt="Join League" 
                            width="16rem" height="6rem"/>
                        <HoloButton 
                            onClick={() => props.router.push("/login")} txt="Create League" 
                            width="16rem" height="6rem"/>      
                    </>
  
                }
           
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
                            onClick={handleJoinRoom} 
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