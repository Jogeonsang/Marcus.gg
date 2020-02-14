import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import RecentSummary from "./recentSummary/recentSummary";
import RecentUsingChampionList from "./recentUsingChampionList/recentUsingChampionList";

const RecentRecord = ({detailGameList}) => {
  const [recordData, setRecordData] = useState([]);
  useEffect(() => {
      const recentUsingChampion = detailGameList.data.reduce((obj,val) => {
        if (obj[val.participant.championId]) {
          obj[val.participant.championId].participant.stats.kills = obj[val.participant.championId].participant.stats.kills + val.participant.stats.kills;
          obj[val.participant.championId].participant.stats.deaths = obj[val.participant.championId].participant.stats.deaths + val.participant.stats.deaths;
          obj[val.participant.championId].participant.stats.assists = obj[val.participant.championId].participant.stats.assists + val.participant.stats.assists;
          obj[val.participant.championId].participant.stats.win = obj[val.participant.championId].participant.stats.win + val.participant.stats.win;
          obj[val.participant.championId].count = obj[val.participant.championId].count + 1;
        } else {
          obj[val.participant.championId] = val;
          obj[val.participant.championId].participant.stats.win = obj[val.participant.championId].participant.stats.win ? 1 : 0;
          obj[val.participant.championId].count = 1;
        }
        return obj
      }, []);
      return setRecordData(recentUsingChampion.filter(x => x).sort((a,b) => b.count - a.count));
  }, []);
  if (recordData.length === 0) {
    return <></>
  }
  return (
    <RecentRecordWrapper>
      <RecentRecordBox>
        <RecentSummary data={recordData}/>
        <RecentUsingChampionList data={recordData}/>
      </RecentRecordBox>
    </RecentRecordWrapper>
  )
};

export default RecentRecord

const RecentRecordWrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  box-shadow: rgba(229, 235, 239, 0.05) 0px -1px inset;
  min-height: 56px;
  position: sticky;
  top: 52px;
  z-index: 3;
  background: linear-gradient(to top, rgb(39, 54, 82) 0%, rgb(32, 43, 67) 100%);
  border-radius: 5px 5px 0px 0px;
  padding: 0px 24px;
  margin-left: 10px;
`;

const RecentRecordBox = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex: 1 1 0%;
  margin: 1.25rem 0px;
`;

