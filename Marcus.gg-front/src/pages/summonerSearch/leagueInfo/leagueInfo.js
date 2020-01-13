import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Circle} from 'rc-progress';
import {getTierColor, getTierName} from "../../../commons/nameUtil";

const LeagueInfo = ({leagueInfo}) => {
  const [soloRank, setSoloRank] = useState({});
  const [teamRank, setTeamRank] = useState({});
  useEffect(() => {
    leagueInfo.map(rank => {
      console.log('rank:', rank)
      rank.queueType === 'RANKED_SOLO_5x5' ? setSoloRank(rank) : setTeamRank(rank);
    })
  }, []);

  console.log('soloRank:', soloRank);
  console.log('teamRank:', teamRank);
  return (
    <LeagueInfoWrapper>
      <SoloRankWrapper>
        <SoloRankTitle>솔로랭크</SoloRankTitle>
        <SoloRankInfo>
          <SoloRankTierIcon>
            <SoloRankTierCircle>
              <Circle percent={soloRank.leaguePoints} trailWidth="4" strokeWidth="4" trailColor="#263552"
                      strokeColor={getTierColor(soloRank.tier)}/>
            </SoloRankTierCircle>
            <img src={`https://s3.ap-northeast-2.amazonaws.com/marcus.gg/lol-tier/${soloRank.tier}.png`}/>
          </SoloRankTierIcon>
          <SoloRankTierInfo>
            <TierName style={{color: getTierColor(soloRank.tier)}}>
              {getTierName(soloRank.tier)}
            </TierName>
            <TierPoint>
              {`${soloRank.leaguePoints} LP`}
            </TierPoint>
          </SoloRankTierInfo>
        </SoloRankInfo>
      </SoloRankWrapper>
      <TeamRankTitle>자유랭크</TeamRankTitle>
    </LeagueInfoWrapper>
  )
};

export default LeagueInfo;

const LeagueInfoWrapper = styled.div`
  
`;
const SoloRankWrapper = styled.div`
  
`;

const SoloRankInfo = styled.div`
  display: flex;
`;

const SoloRankTierCircle = styled.div`
  width: 108px;
  height: 108px;
`;
const SoloRankTierInfo = styled.div`
  margin-left: 20px;
`;
const SoloRankTierIcon = styled.div`
  img {
    position: relative;
    width: 72px;
    height: 72px;
    bottom: 90px;
    left: 18px;
  }
`;
const SoloRankTitle = styled.div`
  color: ${props => props.color ? props.theme.TierColor[props.color] : '#FFFFFF'};
  margin-bottom: 15px;
`;

const TierName = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const TierPoint = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #88A0B5;
`;
const TeamRankTitle = styled.div`
  color: ${props => props.color ? props.theme.TierColor[props.color] : '#FFFFFF'};
`;

