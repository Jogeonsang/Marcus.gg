import React from 'react';
import styled from 'styled-components';
import {useChampion} from "../../../../../commons/context";
import {getKDA, getVictoryRate} from "../../../../../commons/calculationUtil";

const RecentUsingChmapion = ({data}) => {
  const {count, participant} = data;
  const {stats} = participant;
  const [champion] = useChampion(participant.championId);
  const win = stats.win;
  const lose = count - stats.win
  const victoryRate = getVictoryRate(win, lose)
  return (
    <RecentUsingChmapionWrapper>
      <ChampionIcon>
        <img src={`http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champion.id}.png`}/>
      </ChampionIcon>
      <div>
        <ChampionStats>
          <VictoryRate victoryRate={victoryRate}>{`${victoryRate}%`}</VictoryRate>
          <WinLose>{`${win}W - ${lose}L`}</WinLose>
        </ChampionStats>
        <KdaAverage KDA={getKDA(stats)}>{`${getKDA(stats)} KDA`}</KdaAverage>
      </div>
    </RecentUsingChmapionWrapper>
  )
};

export default RecentUsingChmapion;

const RecentUsingChmapionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 17px;
  &:nth-last-child(1) {
    margin: 0;
  }
`;

const ChampionIcon = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background: rgb(19, 28, 46);
  margin-right: 10px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const ChampionStats = styled.div`
  display: flex;
  align-items: baseline;
`;

const VictoryRate = styled.p`
margin: 0px;
margin-right: 0.25rem;
box-sizing: border-box;
padding-top: 2px;
font-size: 0.875rem;
font-style: normal;
font-weight: 700;
color: ${props => {
  if (props.victoryRate > 50) {
    return '#49B4FF'
  } else if (props.victoryRate === 50) {
    return '#BBC9E0'
  } else {
    return '#FF5859'
  }
}};
`;

const WinLose = styled.p`
  color: #89A0B5;
  font-size: 12px;
  font-weight: normal;
  margin: 0;
`;

const KdaAverage = styled.p`
  padding-top: 8px;
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
