import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./style.module.css"
import Member from './member'

const Room = () => {

    const [code, setCode] = useState("")
    const [users, getUsers] = useState([])
    const [room, getName] = useState("")


    const getRoom = async () => {
        try{
          axios.get(`http://localhost:8080/api/rooms/${13}`)
          .then(res => {
            const members = res.data.members;
            const room = res.data.name;
            console.log(members)
            console.log(room)
            getUsers(members);
            getName(room)

          })
        }
        catch(e){
          console.log(e)
        }
      };

      useEffect (() => {
        getRoom();
    

      }, [])

    return(
        <>
        <div className={style.container}>
            <h1 className={style.name}>{room}</h1>
            <div className={style.memberContainer}>
                <h3>Members</h3>
                <div className={style.memberList}><Member users={users}/></div>
            </div>
        </div>
        </>
    );

};
export default Room;