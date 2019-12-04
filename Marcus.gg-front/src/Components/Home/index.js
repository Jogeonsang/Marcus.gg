import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  margin: 0 auto;
`

const HomeMainImg = styled.img`
  display: block;
  max-width: 360px;
  max-height: 232px;
  margin: 0 auto;
  margin-top: 6.5rem;
  margin-bottom: 2rem;
`

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  width: 664px;
  height: 54px;
  position: relative;
  z-index: 5;
  margin-top: 0px;
  overflow: hidden;
  padding: 0px;
  border-radius: 8px;
  border: 1px solid #48526A;
`

const Input = styled.input`
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  padding-left: 24px;
  z-index: 11;
  width: 80%;
  height: 100%;
  line-height: 54px;
  font-weight: 500;
  letter-spacing: 0.5px;
  font-size: 1.4em;
  color: rgb(137, 160, 181);
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
`

const Button = styled.button`
display: flex;
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px 10px 0 0;
    height: 30px;
    padding: 0;
    border: none;
    color: #141D33;
    width: 50px;
    font-size: 18px;
    font-weight: 600;
    background-color: #C8CFDB;;
    justify-content: center;
    outline: none;
`

const GameSelectContainer = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 195px);
  width: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  grid-column-gap: 16px;
`

const GameSelectLink = styled(Link)`
  width: 195px;
  height: 195px;
  display: grid;
  position: relative;
  transform: translateY(0px);
  background: rgb(24, 35, 56);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease 0s;
  pointer-events: ${props => (props.isOpen ? '' : 'none')};
  opacity: ${props => (props.isOpen ? '1' : '0.6')};
  border: ${props => (props.isOpen ? 'none' : '1px dashed')};
`

const GameSelectBox = styled.div`
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-size: cover;
  background-position: center center;
  background-image: url(
    ${props => props.gameBackground}
  );
`

const GameSelectBoxTitleBox = styled.div`
  text-align: center;
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
  padding-bottom: 19px;
`
const GameSelectBoxIcon = styled.img`
  height: 36px;
  width: 36px;
  line-height: 1;
  transform: translateY(-10px);
`

const GameSelectTitle = styled.h3`
  font-size: 0.875rem;
  color: rgb(229, 235, 239);
  margin-top: 0px;
  margin-bottom: 0.625rem;
  line-height: 1;
`
const Home = () => {
  const GameList = [
    {path: '/', title: '리그 오브 레전드', gameBackground: 'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/lol-background.png', gameIcon: 'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/leagueOfLegendIcon.png', isOpen: true},
    {path: '/', title: '전략적 팀 전투', gameBackground: 'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/tft-background.png', gameIcon: 'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/tft-icon.png', isOpen: false},
    {path: '/',title: '레전드 오브 룬테라', gameBackground: 'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/lor-background.png', gameIcon: 'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/lor-icon.png', isOpen: false}
  ]
    return (
        <HomeContainer>
            <HomeMainImg
                src={"https://s3.ap-northeast-2.amazonaws.com/marcus.gg/kaisa_logo_darknavy_all.svg"}
                alt="logo"
            />
            <FormContainer>
                <Form>
                    <Input
                        placeholder="소환사 검색"
                        type="text"
                    />
                    <Button>.GG</Button>
                </Form>
            </FormContainer>
            <GameSelectContainer>
              {GameList.map(list => {
                const { path, title, gameBackground, gameIcon, isOpen } = list;
                return (
                  <GameSelectLink to={path} isOpen={isOpen}>
                    <GameSelectBox gameBackground={gameBackground}/>
                    <GameSelectBoxTitleBox>
                      <GameSelectBoxIcon src={gameIcon} alt={""}/>
                      <GameSelectTitle>{title}</GameSelectTitle>
                    </GameSelectBoxTitleBox>
                  </GameSelectLink>
                )
              })}
            </GameSelectContainer>
        </HomeContainer>
    )
}

export default Home;
