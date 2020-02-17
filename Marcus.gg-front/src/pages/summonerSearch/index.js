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

const SummonerSearch = ({location}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [summonerInfo, setSummonerInfo] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [leagueInfo, setLeagueInfo] = useState([]);
  const [recentChampion, setRecentChampion] = useState({});
  const [detailGameList, setDetailGameList] = useState([]);
  const [mainChampion, setMainChampion] = useState(0);
  const [champion] = useChampion(mainChampion.championId);
  const sleep = m => new Promise(r => setTimeout(r, m));
  useEffect(() => {
    setIsLoading(true);
    const summonerName = queryString.parse(location.search).summonerName;
    getSummonerInfo(summonerName).then(async res => {
      if (res.data) {
        const {accountId, id: encryptedSummonerId} = res.data.data;
        const fetchLeagueInfo = await getSummonerLeagueInfo(encryptedSummonerId);
        await sleep(1000);
        const fetchDetailGameList = await getDetailGameList(accountId, summonerName);
        await sleep(1000);
        const fetchRecentChampion = await getRecentChampion(accountId, summonerName);
        await sleep(1000);

        await setLeagueInfo(fetchLeagueInfo.data.data);
        await setDetailGameList(fetchDetailGameList.data);
        await setRecentChampion(fetchRecentChampion.data);
        await setSummonerInfo(res.data);
        await setMainChampion(fetchRecentChampion.data.data[0]);
        await setIsLoading(false);
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
