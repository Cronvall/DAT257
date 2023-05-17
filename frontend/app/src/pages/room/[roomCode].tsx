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
import IMember from "./interfaces/IMember";
import MyStats from "./components/myStats";
import Footer from "@/components/footer";
import IRoom from "./interfaces/IRoom";
import IStock from "./interfaces/IStock";
import BuyStock from "./components/buyStock";
import OthersStocks from "./components/othersStocks";

const Room: NextPage = () => {

  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [roomData, setRoomData] = useState<IRoom | undefined>(undefined);
  const [currentUserPortfolio, setCurrentUserPortfolio] = useState<IStock[]>([]);
  const [currentPortfolioId, setCurrentPortfolioId] = useState<number | undefined>(undefined);
  const [members, setMembers] = useState<IMember[] | undefined>([]);


  const getRoom = async () => {
    const {roomCode} = router.query;
    try{
      axios.get(`http://localhost:8080/api/rooms/${roomCode}`)
      .then(res => {
        setRoomData(res.data);
        console.log(res.data)
      })

    }
    catch(e){
      console.log(e)
    }
  };

// On init get current user
  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

//When router is ready get room data
  useEffect(() => {
    if(router.isReady){
      getRoom();
    }
  }, [router.isReady]);

  //When room data is ready get current user portfolio
  useEffect(() => {
    roomData?.members.forEach(member => {
      if(member.id.userId === currentUser?.id){
        setCurrentUserPortfolio(member.portfolio.stocks);
        setCurrentPortfolioId(member.portfolio.id);
      }
    });
    setMembers(roomData?.members);
  }, [roomData, currentUser]);


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
                    <MembersLeaderboard users={members} budget={roomData?.budget}/>
                </Grid>

                <Grid 
                  className={style.chartContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >
                  <h2>Stock Finder</h2>
                  <BuyStock portfolioId={
                    roomData?.members.find(member => member.id.userId === currentUser?.id)?.portfolio.id
                  }/>
                </Grid>
                <Grid
                  className={style.memberContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >

                  <h2>{currentUser?.username} Portfolio</h2>
                  <StocksTable stocks={currentUserPortfolio} currentPortfolio={currentPortfolioId || 0}/>
                </Grid>
                <Grid
                  className={style.memberContainer}
                  xs={12} sm={12} md={12} lg={6} xl={6}
                >
                  <OthersStocks members={roomData?.members || []}/>
                </Grid>

              </Grid.Container>
          </div>
          <Footer />
        </>
    );


};
export default Room;