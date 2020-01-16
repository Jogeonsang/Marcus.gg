import React from 'react';
import {Circle} from "rc-progress";
import {getTierColor, getTierName} from "../../../../commons/nameUtil";
import {getVictoryRate} from "../../../../commons/calculationUtil";
import styled from "styled-components";

const SoloRank = ({data}) => {

  const { leaguePoints, tier, wins, losses } = data;
  return (
    <SoloRankInfo>
      <SoloRankTierIcon>
        <SoloRankTierCircle>
          <Circle percent={leaguePoints} trailWidth="4" strokeWidth="4" trailColor="#263552"
                  strokeColor={getTierColor(tier)}/>
        </SoloRankTierCircle>
        <img src={`https://s3.ap-northeast-2.amazonaws.com/marcus.gg/lol-tier/${tier}.png`}/>
      </SoloRankTierIcon>
      <SoloRankTierInfo>
        <TierName style={{color: getTierColor(tier)}}>
          {getTierName(tier)}
        </TierName>
        <TierPoint>
          {`${leaguePoints} LP`}
        </TierPoint>
        <TierPoint>
          {`${wins}승 ${losses}패 (${getVictoryRate(wins, losses)}%)`}
        </TierPoint>
      </SoloRankTierInfo>
    </SoloRankInfo>
  )
};

export default SoloRank;

const SoloRankInfo = styled.div`
  display: flex;
`;

const SoloRankTierCircle = styled.div`
  width: 108px;
  height: 108px;
`;
const SoloRankTierInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;
const SoloRankTierIcon = styled.div`
  img {
    position: relative;
    width: 72px;
    height: 72px;
    bottom: 88px;
    left: 18px;
  }
`;

const TierName = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const TierPoint = styled.div`
  font-size: 0.75rem;
  margin-top: 10px;
  font-weight: 700;
  color: #88A0B5;
`;
