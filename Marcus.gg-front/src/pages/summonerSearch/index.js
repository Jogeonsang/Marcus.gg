import React, {useEffect, useState} from 'react';
import queryString from "query-string";
import styled from 'styled-components';
import {
  getDetailGameList,
  getRecentChampion,
  getSummonerGameList,
  getSummonerInfo,
  getSummonerLeagueInfo
} from '../../api/api'
import SummonerSummary from "./summary/summary";
import CardView from "../../commons/CardView/CardView";
import LeagueInfo from "./leagueInfo/leagueInfo";
import RecentChampionList from "./recentChampionList/recentChampionList";
import GameList from "./gameList/gameList";
import RecentRecord from "./recentRecord/recentRecord";
import {useChampion} from "../../commons/context";
import {customAsync} from "../../commons/asyncUtils";

const SummonerSearch = ({location}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [summonerInfo, setSummonerInfo] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [leagueInfo, setLeagueInfo] = useState([]);
  const [recentChampion, setRecentChampion] = useState({});
  const [detailGameList, setDetailGameList] = useState([]);
  const [mainChampion, setMainChampion] = useState(0);
  const [champion] = useChampion(mainChampion.championId);
  const sleep = (api, m) => new Promise(r => {
    setTimeout(api, m, r)
  });
  useEffect(() => {
    setIsLoading(true);
    const summonerName = queryString.parse(location.search).summonerName;
    getSummonerInfo(summonerName).then(async res => {
      if (res.data) {
        const {accountId, id: encryptedSummonerId} = res.data.data;
        Promise.all([
          await customAsync(getSummonerLeagueInfo(encryptedSummonerId), 1000),
          await customAsync(getDetailGameList(accountId, summonerName), 1000),
          await customAsync(getRecentChampion(accountId, summonerName), 1000),
        ]).then(([fetchLeagueInfo, fetchDetailGameList, fetchRecentChampion,]) => {
          setLeagueInfo(fetchLeagueInfo.data.data);
          setDetailGameList(fetchDetailGameList.data);
          setRecentChampion(fetchRecentChampion.data);
          setSummonerInfo(res.data);
          setMainChampion(fetchRecentChampion.data.data[0]);
          setIsLoading(false);
        })
      }
    });
  }, []);
  if (isLoading) {
    return (
      <div>
        Is Loading
      </div>
    )
  }

  return (
    <>
      <SummonerContainer>
        <SummonerProfileColumn>
          <CardView>
            <SummonerSummary summonerInfo={summonerInfo.data}/>
          </CardView>
          <CardView>
            <LeagueInfo leagueInfo={leagueInfo}/>
          </CardView>
          <CardView>
            <RecentChampionList recentChampion={recentChampion}/>
          </CardView>
        </SummonerProfileColumn>
        <SummonerRecentRecordColumn>
          <RecentRecord detailGameList={detailGameList}/>
          <CardView flexGrow={10}>
            <GameList detailGameList={detailGameList}/>
          </CardView>
        </SummonerRecentRecordColumn>
      </SummonerContainer>
      <SummonerWrapper championId={champion.id}/>
    </>
  )
};

export default SummonerSearch

const SummonerContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  padding: 50px 10%;
`;

const SummonerProfileColumn = styled.div`
  min-width: 320px;
  display: flex;
  flex-direction: column;
`;

const SummonerRecentRecordColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const SummonerWrapper = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: scale(1.1);
  background-image: url(${props => `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.championId}_0.jpg`});
  background-size: cover;
  opacity: 0.5;
`;
