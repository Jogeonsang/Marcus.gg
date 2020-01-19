import React from 'react';
import {Circle} from "rc-progress";
import {getTierColor, getTierName} from "../../../../commons/nameUtil";
import {getVictoryRate} from "../../../../commons/calculationUtil";
import styled from "styled-components";

const SoloRank = ({data}) => {

  const {leaguePoints, tier, wins, losses, miniSeries = {}} = data;

  const renderRankPromo = () => {
    const {progress = ''} = miniSeries;
    let gameProgress = [];
    for (let i = 0; i < progress.length; i++) {
      gameProgress.push(progress.substr(i, 1));
    }
    if (miniSeries) {
      return (
        <>
          <RankPromoTitle>
            승급/승격전 진행 중
          </RankPromoTitle>
          <RankPromo>
            {
              gameProgress.map(x => (
                <MiniSeries promoState={x}/>
              ))
            }
          </RankPromo>
        </>
      )
    }
    return (
      <TierPoint>
        {`${leaguePoints} LP`}
      </TierPoint>
    )
  }

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
        {renderRankPromo()}
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
  height: 108px;
  img {
    position: relative;
    width: 62px;
    height: 62px;
    bottom: 84px;
    left: 22px;
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

const RankPromoTitle = styled.div`
   padding: 10px 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: #88A0B5;
`;

const RankPromo = styled.div`
  display: flex;
`;
const MiniSeries = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${props => {
  if (props.promoState === 'W') {
    return '#77bcf3'
  } else if (props.promoState === 'L') {
    return '#FF5859'
  } else {
    return '#141D33'
  }
}};
  border: 1px solid rgb(52,63,87);
  &:nth-last-child(1) {
    margin: 0;
  }
`;
