import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import {
  getDamagePerMinute,
  getKDA,
  getMiniosKillRate,
  KillInvolvementRate,
  teamDamageRate
} from "../../../../commons/calculationUtil";
import {getPlayTime, getQueueType} from "../../../../commons/gameUtils";

const GameRecord = ({participant, totalKills, gameDuration, queueId}) => {
  const {stats} = participant;
  let {kills, deaths, assists, wardsPlaced, wardsKilled, totalMinionsKilled, neutralMinionsKilled, totalDamageDealtToChampions} = stats;
  return (
    <GameRecordWrapper>
      <WinsLose win={stats.win}>
        {stats.win ? '승리' : '패배'}
      </WinsLose>
      <TwoLineWrapper>
        <KdaAverage KDA={getKDA(stats)}>
          {`${getKDA(stats)} KDA`}
        </KdaAverage>
        <KdaList>
          {`${kills} / ${deaths} / ${assists}`}
        </KdaList>
      </TwoLineWrapper>
      <TwoLineWrapper>
        <WardPoint>
          {/**설치한 와드수 / 제거한 와드수**/}
          {`${wardsPlaced} / ${wardsKilled}`}
        </WardPoint>
        <InvolvementRate>
          {`킬관여율 ${KillInvolvementRate(totalKills, stats)}%`}
        </InvolvementRate>
      </TwoLineWrapper>
      <TwoLineWrapper>
        <MinionsPerMinute>
          {`${getMiniosKillRate(totalMinionsKilled+neutralMinionsKilled, gameDuration)}CS/분`}
        </MinionsPerMinute>
        <TotalMinions>
          {`${totalMinionsKilled + neutralMinionsKilled} CS`}
        </TotalMinions>
      </TwoLineWrapper>
      <TwoLineWrapper>
        <DamagePerMinute>
          {`분당 피해량 ${getDamagePerMinute(totalDamageDealtToChampions, gameDuration)}`}
        </DamagePerMinute>
        <TotalDamage>
          {`아군 피해량의 ${teamDamageRate(stats)}%`}
        </TotalDamage>
      </TwoLineWrapper>
      <TwoLineWrapper>
        <GameDuration>
          {getPlayTime(gameDuration)}
        </GameDuration>
        <GameType>
          {getQueueType(queueId)}
        </GameType>
      </TwoLineWrapper>
    </GameRecordWrapper>
  )
};

export default GameRecord;

const GameRecordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 0%;
  padding: 0px 1rem;
`;

const WinsLose = styled.div`
  box-sizing: border-box;
  padding-top: 2px;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${props => props.win ? '#49B4FF' : '#FF5859'}
`;

const TwoLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const KdaAverage = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${props => {
  if (props.KDA <= 1) return 'rgb(130, 135, 144)'
  else if (props.KDA <= 2) return 'rgb(151, 141, 135)'
  else if (props.KDA <= 3.5) return 'rgb(196, 168, 137)'
  else if (props.KDA <= 5) return 'rgb(230, 168, 95)'
  else if (props.KDA <= 10) return 'rgb(255, 148, 23)'
  else return 'rgb(255, 148, 23)'
}};
  padding-bottom: 9px;
`;

const KdaList = styled.div`
  box-sizing: border-box;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  color: #89A0B5;
  margin: 0px;
`;

const WardPoint = styled.div`
  font-size: 12px;
  color: #FFF;
  font-weight: 700;
  padding-bottom: 9px;
`;

const InvolvementRate = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #89A0B5;
`;

const MinionsPerMinute = styled.div`
  font-size: 12px;
  color: #FFF;
  font-weight: 700;
  padding-bottom: 9px;
`;
const TotalMinions = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #89A0B5;
`;

const DamagePerMinute = styled.div`
  font-size: 12px;
  color: #FFF;
  font-weight: 700;
  padding-bottom: 9px;
`;

const TotalDamage = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #89A0B5;
`;

const GameDuration = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #89A0B5;
  padding-bottom: 9px;
`;

const GameType = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #89A0B5;
`;
