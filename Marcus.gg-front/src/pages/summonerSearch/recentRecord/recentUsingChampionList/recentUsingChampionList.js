import React from 'react';
import styled from 'styled-components';
import RecentUsingChampion from "./recentUsingChmapion/RecentUsingChampion";

const RecentUsingChampionList = ({data}) => {

  return (
    <Wrapper>
      {data.map((each, index) => {
        if(index < 3) {
          return <RecentUsingChampion data={each}/>
        }
      })}
    </Wrapper>
  )
};

export default RecentUsingChampionList;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 0%;
`;
