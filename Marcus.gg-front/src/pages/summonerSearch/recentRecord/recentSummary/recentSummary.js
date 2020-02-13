import React from 'react';
import styled from 'styled-components';
import {getKDA} from "../../../../commons/calculationUtil";

const RecentSummary = ({data}) => {

  const recentSummary = data.reduce((obj, val) => {
    if (obj) {
      obj.count = obj.count + val.count;
      obj.kills = obj.kills + val.participant.stats.kills;
      obj.deaths = obj.deaths + val.participant.stats.deaths;
      obj.assists = obj.assists + val.participant.stats.assists;
      obj.wins = obj.wins + val.participant.stats.win
    }
    return obj
  }, {count: 0, kills: 0, deaths: 0, assists: 0, wins: 0});
  const {count, kills, deaths, assists, wins} = recentSummary;
  return (
    <RecentSummaryWrapper>
      <div>
        <WinLose>{`${wins}W ${count-wins}L`}</WinLose>
        <LastGame>{`마지막 게임 ${count}`}</LastGame>
      </div>
      <div>
        <KdaAverage>{`${getKDA(recentSummary)} KDA`}</KdaAverage>
      </div>
    </RecentSummaryWrapper>
  )
};

export default RecentSummary

const RecentSummaryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const WinLose = styled.p`
  color: #E5EBEF;
  padding-top: 2px;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  margin: 0;
`;

const LastGame = styled.p`
  padding-top: 2px;
  font-size: 0.75rem;
  font-weight: normal;
  font-style: normal;
  color: rgb(137, 160, 181);
  margin: 0px;
`;

const KdaAverage = styled.p`
  padding-top: 2px;
  font-size: 0.875rem;
    font-weight: normal;
    font-style: normal;
    margin: 0px;
  color: ${props => {
  if (props.KDA <= 1) return 'rgb(130, 135, 144)'
  else if (props.KDA <= 2) return 'rgb(151, 141, 135)'
  else if (props.KDA <= 3.5) return 'rgb(196, 168, 137)'
  else if (props.KDA <= 5) return 'rgb(230, 168, 95)'
  else if (props.KDA <= 10) return 'rgb(255, 148, 23)'
  else return 'rgb(255, 148, 23)'
}};
`;
