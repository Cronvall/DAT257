import axios from "axios";
import style from "./style.module.css"
import React, { useState } from "react";


const Body = () => {

    const [join, setJoin] = useState(false);
    const [create, setCreate] = useState(false);
    const [start, setStart] = useState(true);
    const [code, setCode] = useState("");

    let testCode = 637170
    let jsonTest = {
      "id": 1,
      "username": "uName1",
      "password": "Pass123"
  }


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
          axios.post('http://localhost:8080/api/rooms/' + code,
          {
            id: 3,
            username: "uName3",
            password: "Pass123",
            email: "email3@gmail.com"
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
        <h2>Enter code</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          joinRoom();
        }}
        className={style.form}
        >
          <label htmlFor="code">Code</label>
          <input 
            type="text"
            name="code"
            className={style.input}
            value={code}
            onChange={(e) => setCode(e.target.value)} />
        </form>
        <button className={style.formButton} type="submit">Join</button>
        </div>

     )}
     {create &&(
        <div className={style.container}>
            <h2>Choose your settings</h2>
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