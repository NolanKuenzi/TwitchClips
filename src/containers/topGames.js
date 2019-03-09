/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import styled from 'styled-components';
import { currentGame, currentGameId, currentBoxArt } from '../actions/index';
import ClientId from '../clientId';
import { Store } from '../store/index';

const WrapperDiv = styled.div`
  margin-left: 2em;
`;

const HeaderDiv = styled.div`
  border: 0.2em solid;
  text-align: center;
  cursor: pointer;
  margin-top: 7em;
  height: 3em;
  width: 15em;
`;

const Arrow = styled.span`
  font-size: 0.7em;
`;

const ListWrapper = styled.div`
  border: 0.2em solid black;
  border-top: none;
  width: 15em;
`;

const StyledInputDiv = styled.div`
  text-align: center;
`;

const StyledInput = styled.input`
  border: 0.2em solid black;
  margin-top: 0.3em;
  margin-right: 0.3em;
  margin-left: 0.3em;
  height: 2em;
  width: 16em;
  outline: none;
`;

const StyledOl = styled.ol`
  list-style-type: none;
`;

const StyledLi = styled.li`
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  margin-left: -2em;
`;

const TwitchGames = () => {
  const { dispatch } = useContext(Store);
  const [gameArray, setGameArray] = useState(null);
  const [gameArrCpy, setGameArrCpy] = useState(null);
  async function Api() {
    try {
      const getGames = 'https://api.twitch.tv/helix/games/top?first=100';
      const gameData = await axios.get(getGames, { headers: { 'Client-ID': ClientId } });
      setGameArray(
        gameData.data.data.map((item, index) => ({
          game: item.name,
          id: item.id,
          boxArt: item.box_art_url,
          index: index + 1,
        })),
      );
    } catch (error) {
      alert("Twitch Games data failed to load, please try again.");
      setGameArrCpy(null);
    }
  }
  useEffect(() => {
    if (gameArray === null) {
      Api();
    }
  }, [Api, gameArray]);
  const newGame = input => {
    let newGameArr = gameArray.slice(0);
    newGameArr = newGameArr.filter(item => item.id === input.id);
    dispatch(currentGameId(newGameArr[0].id));
    dispatch(currentGame(newGameArr[0].game));
    dispatch(currentBoxArt(newGameArr[0].boxArt.replace('{width}x{height}', '125x125')));
  };
  const dropDownToggle = () => {
    if (gameArrCpy === null) {
      setGameArrCpy(gameArray.slice(0));
    } else {
      setGameArrCpy(null);
    }
  };
  const filterGames = input => {
    let filterArr = gameArray.slice(0);
    filterArr = filterArr.filter(
      item => item.game.toLowerCase().indexOf(input.target.value.toLowerCase()) !== -1,
    );
    setGameArrCpy(filterArr.slice(0));
  };
  return (
    <WrapperDiv>
      <HeaderDiv onClick={() => dropDownToggle()}>
        <h3>
          Choose a Game
          <Arrow>{' '}{gameArrCpy === null ? '▼' : '▲'}</Arrow>
        </h3>
      </HeaderDiv>
      {gameArrCpy === null ? null : (
        <ListWrapper>
          <StyledInputDiv>
            <StyledInput
              type="text"
              placeholder="Search the Top 100 Games"
              onChange={input => filterGames(input)}
            />
          </StyledInputDiv>
          <StyledOl>
            {gameArrCpy.map(item => (
              <StyledLi onClick={() => newGame(item)} key={item.game}>
                {item.index}{'.'} {item.game}
              </StyledLi>
            ))}
          </StyledOl>
        </ListWrapper>
      )}
    </WrapperDiv>
  );
};

export default TwitchGames;
