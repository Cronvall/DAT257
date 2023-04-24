import style from "./styles/createRoom.module.css"
import React, { useState } from "react";
import axios from "axios";



const CreateRoomPanel = () => {

    const [name, setName] = useState("")
    const [budget, setBudget] = useState("")
    const [capacity, setCapacity] = useState("")


    const createRoom = async () => {
        try{
          axios.post('http://localhost:8080/api/rooms',
          {
            name: name,
            budget: budget,
            capacity: capacity,
            owner:{
            id: 3,
            username: "uName3",
            password: "Pass123",
            email: "email3@gmail.com"
          }
          })
        }
        catch(e){
          console.log(e)
        }
      };

  return (
    <>
    <div className={style.darkBg}>
        <div className={style.modal}>
            <h2>Create Room</h2>
            <form id="create-form" onSubmit={(e) => {
                e.preventDefault();
                createRoom();
                
            }}
            className={style.form}>
                <label htmlFor="name">Name: </label>
                <input 
                type="text" 
                name ="name" 
                className={style.input}
                onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="budget">Budget: </label>
                <input 
                type="text" 
                name ="budget" 
                className={style.input}
                onChange={(e) => setBudget(e.target.value)}
                />
                <label htmlFor="capacity">Capacity: </label>
                <input 
                type="text" 
                name ="capacity" 
                className={style.input}
                onChange={(e) => setCapacity(e.target.value)}
                />
            </form>
            <div className={style.formButtons}>
                <button className={style.formButton} type="submit" form="create-form">Create</button>
                <button className={style.formButton}>Back</button>
            </div>
        </div>
    </div>
    </>
  );
};
export default CreateRoomPanel;

