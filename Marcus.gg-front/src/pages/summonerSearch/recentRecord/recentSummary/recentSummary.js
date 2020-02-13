import React from 'react';
import styled from 'styled-components';
import {getKDA, getVictoryRate} from "../../../../commons/calculationUtil";

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
  let {count, kills, deaths, assists, wins} = recentSummary;
  kills = kills / count;
  deaths = deaths / count
  assists = assists / count;
  return (
    <RecentSummaryWrapper>
      <div style={{marginRight: '1.5rem'}}>
        <RecentRecordWins>{`${wins}W ${count-wins}L`}</RecentRecordWins>
        <ColumnBottom>{`마지막 게임 ${count}`}</ColumnBottom>
      </div>
      <div>
        <KdaAverage KDA={getKDA(recentSummary)}>{`${getKDA(recentSummary)} KDA`}</KdaAverage>
        <ColumnBottom>{`${kills} / ${deaths} / ${assists}`}</ColumnBottom>
      </div>
      <ProgressbarWrapper>
        <Progressbar Average={getVictoryRate(wins, count-wins)}/>
      </ProgressbarWrapper>
    </RecentSummaryWrapper>
  )
};

export default RecentSummary

const RecentSummaryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RecentRecordWins = styled.p`
  color: #E5EBEF;
  padding-top: 2px;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  margin: 0;
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

const ColumnBottom = styled.p`
  padding-top: 7px;
  font-size: 0.75rem;
  font-weight: normal;
  font-style: normal;
  color: rgb(137, 160, 181);
  margin: 0px;
`;

const ProgressbarWrapper = styled.div`
  position: relative;
  height: 2px;
  margin-top: 0.75em;
  width: 100%;
  background: rgb(52, 63, 87);
  border-radius: 3px;
`;

const Progressbar = styled.div`
  content: "";
  height: 2px;
  left: 0px;
  position: absolute;
  top: 0px;
  width: ${props => props.Average}%;
  border-radius: 6px;
  background: rgb(119, 188, 243);
`;
