import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
// import {loggedInId} from "../login/index";
import { getCurrentUser } from "@/services/auth.service";
import NavBar from "@/components/navBar";

const MyProfile = () => {
  const user = getCurrentUser();

  return (
    <>
      <NavBar transparent={false}/>
      <form className={styles.form}>
        <h2>Profile Page (for user id:{ user.id})</h2> 
        <label htmlFor="username">Username: {user.username}</label>
        <label htmlFor="email">Email: {user.email}</label>
        <label htmlFor="leagues">Leagues: </label>
      </form>
    </>
  );
};

export default MyProfile;
