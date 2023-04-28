import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./style.module.css"
import Member from './member'
import { Line, LineChart, XAxis, YAxis } from "recharts"
import { useRouter } from "next/router";
import { NextPage } from "next";

const Room: NextPage = () => {

  const router = useRouter();

  const [users, getUsers] = useState([])
  const [room, getName] = useState("")


  const getRoom = async () => {
    try{
      axios.get(`http://localhost:8080/api/rooms/${roomCode}`)
      .then(res => {
        const members = res.data.members;
        const room = res.data.name;
        console.log(members)
        console.log(room)
        getUsers(members);
        getName(room);
      })
    }
    catch(e){
      console.log(e)
    }
  };

  useEffect (() => {
    getRoom();
  }, [])

  const data = [
    {
      name: "Page A",
      uv: 10000,
      pv: 5000,
      amt: 2400,
      },
      {
      name: "Page B",
      uv: 3000,
      pv: 2000,
      amt: 2000,
      },
      {
      name: "Page C",
      uv: 2000,
      pv: 1400,
      amt: 1400,
      }
    ]

    return(
        <>
        <div className={style.container}>
            <h1 className={style.name}>{room}</h1>
            <div className={style.body}>
                <div className={style.memberContainer}>
                    <h3>Members</h3>
                    <div className={style.memberList}><Member users={users}/></div>
                </div>
                <LineChart width={500} height={300} data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
            </div>
        </div>
        </>
    );


};
export default Room;