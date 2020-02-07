import React from 'react';
import styled from 'styled-components';
import {useChampion} from "../../../../commons/context";

const ChampionProfile = ({championId, lane}) => {
  const [champion] = useChampion(championId);
  console.log('lane:', lane)
  return (
    <ChampionImg championImg={`http://ddragon.leagueoflegends.com/cdn/10.3.1/img/champion/${champion.id}.png`}>
      {/*<LaneWrapper>
        <LaneImg lane={lane}/>
      </LaneWrapper>*/}
    </ChampionImg>
  )
};

export default ChampionProfile

const ChampionImg = styled.div`
  position: relative;
  width: 3.75rem;
  height: inherit;
  margin-right: 0.25rem;
  background-image: url(${props => props.championImg});
  background-size: cover;
  background-color: rgb(7, 14, 29);
  background-position: center center;
  background-repeat: no-repeat;
  transition: all 0.15s ease-in 0s;
`;

const LaneWrapper = styled.div`
  position: absolute;
  display: flex;
  right: -0.75rem;
  top: 0.75rem;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: rgb(24, 35, 56);
  border-radius: 3px;
`;
const LaneImg = styled.div`
  background-image: url(${props => {
  if (props.lane === 'JUNGLE') {
    return `https://s3.ap-northeast-2.amazonaws.com/marcus.gg/lol-position/Position_Jungle.png`
  } else if (props.lane === 'MID') {
    return 'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/lol-position/Position_Mid.png'
  } else if (props.lane === 'TOP') {
    return 'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/lol-position/Position_Top.png'
  }
}});
  display: block;
  height: 75%;
  width: 75%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
