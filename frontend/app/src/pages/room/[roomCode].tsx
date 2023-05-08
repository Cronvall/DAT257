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

  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [room, setRoom] = useState<IRoom | undefined>(undefined);


  const getRoom = async () => {
    const {roomCode} = router.query;
    try{
      axios.get(`http://localhost:8080/api/rooms/${roomCode}`)
      .then(res => {
        console.log(res.data);
        setUsers(res.data.members);
        setRoom(res.data.name);
      })
    }
    catch(e){
      console.log(e)
    }
  };


  useEffect(() => {
    getRoom();
    setCurrentUser(getCurrentUser());
    console.log(users)
  }, []);


    return(
        <>
          <NavBar transparent={false}/>

          <div className={style.mainContainer}>
            <div className={style.headerContainer}>
              <h1 className={style.name}>{room?.name || "pathname"}</h1>
              <h2>{room?.code || "pathcode"}</h2>
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