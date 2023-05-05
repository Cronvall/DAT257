import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./style.module.css"
import MembersLeaderboard from './components/membersLeaderboard'
import { useRouter } from "next/router";
import { NextPage } from "next";
import NavBar from "../../components/navBar";
import LeagueChart from "./components/leagueChart";
import StocksTable from "./components/stocksTable";
import { Grid, Spacer } from "@nextui-org/react";
import Chat from "./components/chat";
import { getCurrentUser } from "@/services/auth.service";

const Room: NextPage = () => {

  const router = useRouter();

  const [users, setUsers] = useState([])
  const [room, setRoom] = useState("")
  const {roomCode} = router.query;


  const getRoom = async () => {
    try{
      axios.get(`http://localhost:8080/api/rooms/${roomCode}`)
      .then(res => {
        setUsers(res.data.members);
        setRoom(res.data.name);
      })
    }
    catch(e){
      console.log(e)
    }
  };


  useEffect(() => {
    //getRoom();
  }, []);


    return(
        <>
          <NavBar transparent={false}/>

          <div className={style.mainContainer}>
            <div className={style.headerContainer}>
              <h1 className={style.name}>{room}</h1>
              <h2>{roomCode || "pathname"}</h2>
            </div>

              <Grid.Container 
                className={style.body}
                justify="center"
                gap={2}
              >
                <Grid
                  className={style.memberContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >
                    <h2>Leaderboard</h2>
                    <MembersLeaderboard users={users}/>
                </Grid>

                <Grid 
                  className={style.chartContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >
                  <h2>Performance</h2>
                  <LeagueChart />
                </Grid>
                <Grid
                  className={style.memberContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >

                  <h2>{getCurrentUser()?.username}'s Portfolio</h2>
                  <StocksTable />
                </Grid>
                <Grid
                  className={style.memberContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >
                  <h2>Chat</h2>
                  <Chat/>
                </Grid>

              </Grid.Container>
          </div>
        </>
    );


};
export default Room;