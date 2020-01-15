import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import SoloRank from "./soloRank/soloRank";

const LeagueInfo = ({leagueInfo}) => {
  const [soloRank, setSoloRank] = useState({});
  const [teamRank, setTeamRank] = useState({});
  useEffect(() => {
    leagueInfo.map((rank) => {
      rank.queueType === 'RANKED_SOLO_5x5' ? setSoloRank(rank) : setTeamRank(rank);
    })
  }, []);

  return (
    <LeagueInfoWrapper>
      <SoloRankWrapper>
        <SoloRankTitle>솔로랭크</SoloRankTitle>
        <SoloRank data={soloRank}/>
      </SoloRankWrapper>
      {teamRank.length > 0
        ? <TeamRankTitle>자유랭크</TeamRankTitle>
        : null
      }
    </LeagueInfoWrapper>
  )
};

export default LeagueInfo;

const LeagueInfoWrapper = styled.div`
  
`;
const SoloRankWrapper = styled.div`
  
`;

const SoloRankTitle = styled.div`
  font-size: 14px;
  color: ${props => props.color ? props.theme.TIER_COLOR[props.color] : '#FFFFFF'};
  margin-bottom: 15px;
`;
const TeamRankTitle = styled.div`
  color: ${props => props.color ? props.theme.TIER_COLOR[props.color] : '#FFFFFF'};
`;

