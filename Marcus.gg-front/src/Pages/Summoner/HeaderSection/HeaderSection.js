import React from 'react';
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const SummonerHeader = ({summonerInfo}) => {
  let {profileIconId, name, revisionDate, summonerLevel} = summonerInfo;
  revisionDate = moment(revisionDate).fromNow();
  return (
    <SummonerHeaderWrapper>
      <SummonerInfo>
        <ProfileImg>
          <img src={`https://ddragon.leagueoflegends.com/cdn/9.24.1/img/profileicon/${profileIconId}.png`}
               alt={"profileIcon"}/>
          <LevelBox>
            {summonerLevel}
          </LevelBox>
        </ProfileImg>
        <SummonerNameBox>
          <SummonerName>{name}</SummonerName>
          <SummonerRevisionDate>{`최근업데이트:${revisionDate}`}</SummonerRevisionDate>
        </SummonerNameBox>
      </SummonerInfo>
    </SummonerHeaderWrapper>
  )
};

export default SummonerHeader;

const SummonerHeaderWrapper = styled.div`
  padding: 50px 0;
`;

const SummonerInfo = styled.div`
  display: flex;
`;

const ProfileImg = styled.div`
  width: 74px;
  height: 74px;
  border-radius: 50%;
  border: 2px solid rgb(52, 63, 87);
  
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid rgb(32, 43, 67);
  }
`;

const LevelBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 14px;
  color: #FFFFFF;
  left: 45px;
  bottom: 27px;
  width: 35px;
  height: 35px;
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
  font-size: 1.4rem;
  font-weight: 700;
  font-style: normal;
  color: #FFFFFF;
  letter-spacing: 0.25px;
  margin: 0px;
  padding-bottom: 12px;
`;

const SummonerRevisionDate = styled.div`
  box-sizing: border-box;
  padding-top: 2px;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  margin: 0px;
  color: #adb5bd;
`;
