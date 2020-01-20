import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import styled from 'styled-components';
import {getRecentChampion, getSummonerGameList, getSummonerInfo, getSummonerLeagueInfo} from '../../api/api'
import SummonerSummary from "./summary/summary";
import CardView from "../../commons/CardView/CardView";
import LeagueInfo from "./leagueInfo/leagueInfo";
import RecentChampionList from "./recentChampionList/recentChampionList";

const SummonerSearch = ({location}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [summonerInfo, setSummonerInfo] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [leagueInfo, setLeagueInfo] = useState([]);
  const [recentChampion, setRecentChampion] = useState({});
  useEffect(() => {
    setIsLoading(true);
    const summonerName = queryString.parse(location.search).summonerName;
    getSummonerInfo(summonerName).then(res => {
      if (res.data) {
        const { accountId, id: encryptedSummonerId } = res.data.data;
        Promise.all([
          getSummonerGameList(accountId),
          getSummonerLeagueInfo(encryptedSummonerId),
          getRecentChampion(accountId),
        ]).then(([fetchGameList, fetchLeagueInfo, fetchRecentChampion]) => {
          setGameList(fetchGameList.data.data);
          setLeagueInfo(fetchLeagueInfo.data.data);
          setRecentChampion(fetchRecentChampion.data);
          setSummonerInfo(res.data);
          setIsLoading(false);
        });
      }
    });
  }, []);

  console.log('loading:', isLoading);
  console.log(summonerInfo)
  if (isLoading) {
    return (
      <div>
        Is Loading
      </div>
      )
  }
  return (
    <SummonerContainer>
      <SummonerProfileColumn>
        <CardView flexGrow={1}>
          <SummonerSummary summonerInfo={summonerInfo.data}/>
        </CardView>
        <CardView flexGrow={1}>
          <LeagueInfo leagueInfo={leagueInfo}/>
        </CardView>
        <CardView>
          <RecentChampionList recentChampion={recentChampion}/>
        </CardView>
      </SummonerProfileColumn>
      {/*<CardView flexGrow={2}>GAMELIST</CardView>*/}
    </SummonerContainer>
  )
};

export default SummonerSearch

const SummonerContainer = styled.div`
  display: flex;
  padding: 50px 20%;
`;

const SummonerProfileColumn = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const SummonerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
            to left top,
            rgba(20, 20, 20, 0) 10%,
            rgba(20, 20, 20, 0.25) 25%,
            rgba(20, 20, 20, 0.5) 50%,
            rgba(20, 20, 20, 0.75) 75%,
            rgba(20, 20, 20, 1) 100%
          ), url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Qiyana_2.jpg");
        background-size: cover;
  opacity: 0.5;
`;
