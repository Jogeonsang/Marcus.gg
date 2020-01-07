import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import styled from 'styled-components';
import { getSummonerInfo } from '../../lib/api'
import SummonerHeader from "./HeaderSection/HeaderSection";

const Summoner = ({location}) => {

  const [summonerInfo, setSummonerInfo] = useState(null)
  useEffect(() => {
    const summonerName = queryString.parse(location.search).summonerName;
    getSummonerInfo(summonerName).then(res => {
      if (res.data) {
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
      <SummonerHeader summonerInfo={summonerInfo.data}/>
    </SummonerContainer>
  )
};

export default Summoner

const SummonerContainer = styled.div`
  padding: 0 10%;
`;
