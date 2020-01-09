import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import styled from 'styled-components';
import {getSummonerGameList, getSummonerInfo} from '../../lib/api'
import SummonerHeader from "./HeaderSection/HeaderSection";

const SummonerSearch = ({location}) => {

  const [summonerInfo, setSummonerInfo] = useState(null);
  const [gameList, setGameList] = useState([]);
  useEffect(() => {
    const summonerName = queryString.parse(location.search).summonerName;
    getSummonerInfo(summonerName).then(res => {
      if (res.data) {
        const { accountId } = res.data.data;
        getSummonerGameList(accountId).then(res => {
          console.log('res:',res)
        });
        return setSummonerInfo(res.data);
      }
    });
  }, []);

  if (!summonerInfo) {
    return (
      <div>
        Is Loading
      </div>
      )
  }
  return (
    <SummonerContainer>
      <SummonerWrapper/>
      <SummonerHeader summonerInfo={summonerInfo.data}/>
    </SummonerContainer>
  )
};

export default SummonerSearch

const SummonerContainer = styled.div`
  padding: 0 20%;
  min-height: 700px;
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
