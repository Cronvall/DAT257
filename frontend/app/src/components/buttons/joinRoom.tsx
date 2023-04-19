import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/joinRoom.module.css"
import rightArrow from "../../assets/icons/right-arrow.svg";
import Image from "next/image";

export default function JoinRoom(props: {roomCode: string}) {

    useEffect(() => {
        console.log(props.roomCode)
    }, [props.roomCode])

    const joinRoom = async () => {
        console.log(props.roomCode)
        try{
          axios.post('http://localhost:8080/api/rooms',
          {
            code: props.roomCode,
          })
        }
        catch(e){
          console.log(e)
        }
      };

    return (
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
    );
};