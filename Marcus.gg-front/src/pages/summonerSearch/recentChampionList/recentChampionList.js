import React from 'react';
import styled from 'styled-components';
import RecentChampion from "./recentChampion/recentChampion";

const RecentChampionList = ({recentChampion}) => {
  return (
    <RecentChampionListWrapper>
      <Title>
        시즌 2020 최근 10게임 챔피언 통계
      </Title>
      {recentChampion.data.map(each => (
          <RecentChampion data={each}/>
        )
      )}
    </RecentChampionListWrapper>
  )
};

export default RecentChampionList

const RecentChampionListWrapper = styled.div`
  width: 100%;
`;
const Title = styled.div`
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 15px;
`;
