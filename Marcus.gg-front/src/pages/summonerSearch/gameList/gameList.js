import React, {useState, useEffect} from 'react';
import styled, { keyframes }from 'styled-components';
import ChampionProfile from "./championProfile/championProfile";
import GameRecord from "./gameRecord/gameRecord";
import MoreButton from "../../../commons/moreButton/moreButton";

const GameList = ({detailGameList}) => {
    const [gameList, setGameList] = useState(detailGameList || []);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
      const {startIndex, endIndex} = pagination;
      setPagination({
        startIndex: startIndex+10,
        endIndex: endIndex+10,
      })
    }, [pagination]);
  return (
    <GameListWrapper>
      {gameList.data.map(list => {
        const { lane, participant, totalKills, gameDuration, queue } = list
        let {championId, stats} = participant;
        return (
          <GameListBox victory={stats.win}>
            <VictoryBar victory={stats.win}/>
            <ChampionProfile championId={championId} lane={lane}/>
            <GameRecord participant={participant} totalKills={totalKills} gameDuration={gameDuration} queueId={queue}/>
          </GameListBox>
        )
      })}
      <MoreButton/>
    </GameListWrapper>
  )
};

export default React.memo(GameList);

const GameListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VictoryBar = styled.div`
  width: 3px;
  margin-right: 0.25rem;
  border-radius: 5px 0px 0px 5px;
  transition: all 0.15s ease-in 0s;
  opacity: 0.8;
  background-color: ${props => {
  if(props.victory) {
    return '#49B4FF';
  } else {
    return 'rgb(255, 88, 89)';
  }
}};
`;

const GameListBox = styled.div`
  position: relative;
  left: 0;
  display: flex;
  width: 660px;
  height: 65px;
  background-color: rgb(24, 35, 56);
  margin: 7px 0;
  border-radius: 5px;
  &:hover {
    transition: left ease 0.5s;
    left: -6px;
  };
  &:hover ${VictoryBar} {
    opacity: 1;
    background-color: ${props => {
  if(props.victory) {
    return '#24E8CC'
  } else {
    return '#FF5859'
    }}};
  };
`;

