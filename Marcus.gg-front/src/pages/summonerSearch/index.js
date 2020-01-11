import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import styled from 'styled-components';
import {getSummonerGameList, getSummonerInfo, getSummonerLeagueInfo} from '../../api/api'
import SummonerSummary from "./summary/summary";
import CardView from "../../commons/CardView/CardView";

const SummonerSearch = ({location}) => {

  const [summonerInfo, setSummonerInfo] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [leagueInfo, setLeagueInfo] = useState([]);
  useEffect(() => {
    const summonerName = queryString.parse(location.search).summonerName;
    getSummonerInfo(summonerName).then(res => {
      if (res.data) {
        const { accountId, id: encryptedSummonerId } = res.data.data;
        Promise.all([
          getSummonerGameList(accountId),
          getSummonerLeagueInfo(encryptedSummonerId),
        ]).then(([fetchGameList, fetchLeagueInfo]) => {
          setGameList(fetchGameList.data.data);
          setLeagueInfo(fetchLeagueInfo.data.data);
        });
        return setSummonerInfo(res.data);
      }
    });
  }, []);

  console.log('gameList:',gameList);
  console.log('leagueInfo:', leagueInfo)
  if (!summonerInfo) {
    return (
      <div>
        Is Loading
      </div>
      )
  }
  return (
    <SummonerContainer>
      <>
        <CardView flexGrow={1}>
          <SummonerSummary summonerInfo={summonerInfo.data}/>
        </CardView>
      </>
      <CardView flexGrow={2}>GAMELIST</CardView>
    </SummonerContainer>
  )
};

export default SummonerSearch

const SummonerContainer = styled.div`
  display: flex;
  padding: 50px 20%;
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
