import React from 'react';
import styled from 'styled-components';
import {useChampion} from "../../../../commons/context";
import {getKDA} from "../../../../commons/calculationUtil";

const RecentChampion = ({data}) => {
  const [champion] = useChampion(data.championId);
  return (
    <RecentChampionWrapper>
      <LeftBox>
        <ChampionIcon src={`http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champion.id}.png`}/>
        <ChampionInfo>
          <ChampionName>
            {champion.name}
          </ChampionName>
          <ChampionPlayCount>
            {`${data.count} 게임`}
          </ChampionPlayCount>
        </ChampionInfo>
      </LeftBox>
      <RightBox>
        <VictoryRate>
        {`승률 ${data.victoryRate}%`}
        </VictoryRate>
        <KDA KDA={getKDA(data.stats)}>
          {`${getKDA(data.stats)} KDA`}
        </KDA>
      </RightBox>
    </RecentChampionWrapper>
  )
};

export default RecentChampion

const RecentChampionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;
const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const ChampionIcon = styled.img`
  width: 36px;
  height: 36px;
  -webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;
  margin-right: 10px;
`;

const ChampionInfo = styled.div`
  
`;

const ChampionName = styled.div`
  font-size: 12px;
  color: #FFF;
  padding-bottom: 5px;
`;

const ChampionPlayCount = styled.div`
  font-size: 12px;
  color: rgb(137, 160, 181);
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VictoryRate = styled.div`
  font-size: 12px;
  color: rgb(121, 134, 163);
  padding-bottom: 5px;
`;

const KDA = styled.div`
  font-size: 12px;
  color: ${props => {
    if (props.KDA <= 1) return 'rgb(130, 135, 144)'
    else if (props.KDA <= 2) return 'rgb(151, 141, 135)'
    else if (props.KDA <= 3.5) return 'rgb(196, 168, 137)'
    else if (props.KDA <= 5) return 'rgb(230, 168, 95)'
    else if (props.KDA <= 10) return 'rgb(255, 148, 23)'
    else return 'rgb(255, 148, 23)'
  }};
`;
