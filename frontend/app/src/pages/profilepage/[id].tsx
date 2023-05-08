import React, { useState, useEffect } from "react";
import { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from 'axios';
import styles from './stock.module.css';
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  // const [leagues, setLeagues] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/users/${id}`)
        .then(res => {
          console.log(res.data);
          setUser(res.data.username);
          setEmail(res.data.email);
          setError(false);
        })
        .catch(err => {
          console.log(err);
          setError(true);
        })
    }
    if (id) {
      axios.get(`http://localhost:8080/api/rooms`, {params : {userId : id}})
        .then(res => {
          console.log(res.data);
          setError(false);
        })
        .catch(err => {
          console.log(err);
          setError(true);
        })
    }
  }, [id])


  return (
    <>
    <NavBar transparent={false}/>
      <div>
        {
        error ? 
        <h1>Profile not found for {id}</h1>
          :
          // 
          <div>
        <h1>Profile of {user}</h1>
        <h2>Email: {email}</h2>
        <h3> Currently in leagues: </h3>
        <button>Join League</button>
        
          </div>
        }
      </div>  

      </>
      
  )
}


export default ProfilePage