import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./style.module.css"
import MembersLeaderboard from './components/membersLeaderboard'
import { useRouter } from "next/router";
import { NextPage } from "next";
import NavBar from "../../components/navBar";
import LeagueChart from "./components/leagueChart";
import StocksTable from "./components/stocksTable";
import { Grid } from "@nextui-org/react";
import { getCurrentUser } from "@/services/auth.service";
import IUser from "@/types/user.type";
import MyStats from "./components/myStats";


interface IRoom{
  id: number;
  name: string;
  capacity: number;
  code: number;
  budget: number;
  startDate: number;
  endDate: number;
  owner: {
    id: number;
    username: string;
    email: string;
    password: string;
  };
  members: [
    {
      id: number;
      username: string;
      email: string;
      password: string;
    }
  ];  
}


const Room: NextPage = () => {

  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [roomData, setRoomData] = useState<IRoom | undefined>(undefined);


  const getRoom = async () => {
    const {roomCode} = router.query;
    try{
      axios.get(`http://localhost:8080/api/rooms/${roomCode}`)
      .then(res => {
        console.log(res.data);
        setRoomData(res.data);
      })
    }
    catch(e){
      console.log(e)
    }
  };


  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);


  useEffect(() => {
    if(router.isReady){
      getRoom();
    }
    console.log('roomData:',roomData)
  }, [router.isReady]);


    return(
        <>
          <NavBar transparent={false}/>

          <div className={style.mainContainer}>
            <div className={style.headerContainer}>
              <h1 className={style.name}>{roomData?.name || "pathname"}</h1>
              <h2>{roomData?.code || "pathcode"}</h2>
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
                    <MembersLeaderboard users={undefined}/>
                </Grid>

                <Grid 
                  className={style.chartContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >
                  <h2>Performance</h2>
                  <LeagueChart/>
                </Grid>
                <Grid
                  className={style.memberContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >

                  <h2>{currentUser?.username} Portfolio</h2>
                  <StocksTable/>
                </Grid>
                <Grid
                  className={style.memberContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >
                  <h2>My Stats</h2>
                  <MyStats/>
                </Grid>

              </Grid.Container>
          </div>
        </>
    );


};
export default Room;