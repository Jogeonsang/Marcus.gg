import React from 'react';
import styled from 'styled-components';
import {useChampion} from "../../../../commons/context";

const RecentChampion = ({data}) => {
  const [champion]= useChampion(data.champion.championId);
  return (
    <RecentChampionWrapper>
      <LeftBox>
        <ChampionIcon src={`http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champion.id}.png`} />
        <ChampionInfo>
          <ChampionName>
            {champion.name}
          </ChampionName>
          <ChampionPlayCount>
            {`${data.count} 게임`}
          </ChampionPlayCount>
        </ChampionInfo>
      </LeftBox>
    </RecentChampionWrapper>
  )
};

export default  RecentChampion

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
  font-size: 13px;
  color: #FFF;
  padding-bottom: 5px;
`;

const ChampionPlayCount = styled.div`
  font-size: 13px;
  color: rgb(137, 160, 181);
`;
