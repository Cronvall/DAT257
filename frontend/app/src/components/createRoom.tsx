import style from "./styles/createRoom.module.css"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/services/auth.service";
import DatePicker from "react-datepicker";



const CreateRoomPanel = (props: {closeMethod: () => void}) => {

    const [name, setName] = useState("")
    const [budget, setBudget] = useState("")
    const [capacity, setCapacity] = useState("")

    const router = useRouter();
    const user = getCurrentUser();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onDateChange = (dates: [Date, Date]) => {
      
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);

  }

  
  

    const createRoom = async () => {
        try{
          const respone = await axios.post('http://localhost:8080/api/rooms',
          {
            name: name,
            budget: budget,
            capacity: capacity,
            startDate: startDate,
            endDate: endDate,
            owner:{
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
          }
          })
          console.log(respone)
          router.push(`/room/${respone.data.code}`)
        }
        catch(e){
          console.log(e)
        }
        
      };

      
      const goBack = () => {
        if (window.confirm("Do you really want to go back? Your input will not be saved.")) {
          props.closeMethod();
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
                <div className={style.datePickerContainer}>
                <label htmlFor="period" className={style.datePickerLabel}>Choose desired period </label>
                <DatePicker
                  selected={startDate}
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={onDateChange}
                />
              </div>
            
            </form>
            <div className={style.formButtons}>
                <button className={style.formButtongreen} type="submit" form="create-form">Create</button>
                <button className={style.formButtonred} onClick={goBack}>Back</button>
            </div>
        </div>
    </div>
    </>
  );
};
export default CreateRoomPanel;

