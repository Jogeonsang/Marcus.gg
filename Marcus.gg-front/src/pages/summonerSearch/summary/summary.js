import React from 'react';
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const SummonerSummary = ({summonerInfo}) => {
  let {profileIconId, name, revisionDate, summonerLevel} = summonerInfo;
  revisionDate = moment(revisionDate).fromNow();
  return (
    <SummonerSummaryWrapper>
      <SummonerInfo>
        <ProfileImg>
          <img src={`https://ddragon.leagueoflegends.com/cdn/10.3.1/img/profileicon/${profileIconId}.png`}
               alt={`no Icon`}
          />
          <LevelBox>
            {summonerLevel}
          </LevelBox>
        </ProfileImg>
        <SummonerNameBox>
          <SummonerName>{name}</SummonerName>
          <SummonerRevisionDate>{`최근업데이트:${revisionDate}`}</SummonerRevisionDate>
        </SummonerNameBox>
      </SummonerInfo>
    </SummonerSummaryWrapper>
  )
};

export default SummonerSummary;

const SummonerSummaryWrapper = styled.div`
`;

const SummonerInfo = styled.div`
  display: flex;
  height: 56px;
`;

const ProfileImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgb(52, 63, 87);
  
  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 2px solid rgb(32, 43, 67);
  }
`;

const LevelBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 11px;
  color: #FFFFFF;
  left: 30px;
  bottom: 22px;
  width: 25px;
  height: 25px;
  background-color: #343a40;
  border-radius: 50%;
`;
const SummonerNameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 5px;
  padding-left: 20px;
`;
const SummonerName = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  font-style: normal;
  color: #FFFFFF;
  letter-spacing: 0.25px;
  margin: 0px;
  padding-bottom: 7px;
`;

const SummonerRevisionDate = styled.div`
  box-sizing: border-box;
  padding-top: 2px;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  margin: 0px;
  color: #adb5bd;
`;
