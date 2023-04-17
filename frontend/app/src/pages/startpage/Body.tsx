import axios from "axios";
import style from "./style.module.css"
import React, { useState } from "react";


const Body = () => {

    const [join, setJoin] = useState(false);
    const [create, setCreate] = useState(false);
    const [start, setStart] = useState(true);
    const [code, setCode] = useState("");


    const handleCreate = () => {
        setCreate(true);
        setStart(false);
    }

    const handleJoin = () => {
        setJoin(true);
        setStart(false)
        console.log(join)
    }

    const handleBack = () => {
        setJoin(false);
        setCreate(false);
        setStart(true);
    }

    const joinRoom = async () => {
        try{
          axios.post('http://localhost:8080/api/rooms',
          {
            code: code,
          })
        }
        catch(e){
          console.log(e)
        }
      };


  return (
    <>
    {start &&( 
        <div className={style.container}>
        <h1>Super mega stock trader league</h1>

        <button className={style.button} onClick = {handleJoin}>Join league</button>
        <button className={style.button} onClick = {handleCreate}>Create league</button>
        </div>
     )}
    {join &&( 
        <div className={style.container}>
        <h3>Enter code</h3>
        <form action="POST"></form>
        </div>

     )}
     {create &&(
        <div className={style.container}>
            <h3>Choose your settings</h3>
            <li>
                <ul>aa</ul>
                <ul>bbb</ul>
            </li>
        </div>
     )}
    </>
  );
};
export default Body;