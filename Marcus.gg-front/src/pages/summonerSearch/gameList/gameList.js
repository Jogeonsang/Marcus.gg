import React from 'react';
import styled from 'styled-components';
import ChampionProfile from "./championProfile/championProfile";

const GameList = ({detailGameList}) => {

  return (
    <GameListWrapper>
      {detailGameList.data.map(list => {
        console.log(list)
        const { lane, participant } = list
        let {championId, stats} = participant;
        return (
          <GameListBox>
            <VictoryBar victory={stats.win}/>
            <ChampionProfile championId={championId} lane={lane}/>
          </GameListBox>
        )
      })}
    </GameListWrapper>
  )
};

export default GameList;

const GameListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameListBox = styled.div`
  display: flex;
  width: 660px;
  height: 65px;
  background-color: rgb(24, 35, 56);
  margin: 7px 0;
  border-radius: 5px;
`;

const VictoryBar = styled.div`
  width: 3px;
  margin-right: 0.25rem;
  border-radius: 5px 0px 0px 5px;
  transition: all 0.15s ease-in 0s;
  background-color: ${props => {
    if(props.victory) {
      return '#49B4FF';
    } else {
      return 'rgb(255, 88, 89)';
    }
  }
}
`;
