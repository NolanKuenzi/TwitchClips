/* eslint-disable */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../store/index';
import {
  currentGameId,
  currentGame,
  currentBoxArt,
  savedClipsArr,
  currentSavedClip,
} from '../actions/index';

const HeaderDiv = styled.div`
  border: 0.2em solid;
  text-align: center;
  cursor: pointer;
  height: 3em;
  width: 15em;
  margin-top: 8em;
`;

const ListDiv = styled.div`
  border: 0.2em solid black;
  border-top: none;
  width: 15em;
  margin-top: -1em;
`;

const Arrow = styled.span`
  font-size: 0.7em;
`;

const SavedClipsLi = styled.li`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: -1em;
`;

const SaveClipButtons = styled.button`
  background-color: rgb(100, 65, 165);
  border: 0.2em solid black;
  outline: none;
  height: 2em;
  cursor: pointer;
  font-size: 0.9em;
  text-align: center;
  margin-top: 0.3em;
  margin-left: 0.1em;
  margin-right: 0.1em;
  font-size: 0.7em;
  :active {
    color: white;
    box-shadow: none;
    transform: translateY(0.3em);
    outline: none;
  }
`;

const SavedClips = () => {
  const { state, dispatch } = useContext(Store);
  const [menu, setMenu] = useState(false);
  const handleToggle = () => {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };
  const playButton = input => {
    dispatch(currentSavedClip([input]));
    dispatch(currentGameId(input.id));
    dispatch(currentGame(input.game));
    dispatch(currentBoxArt(input.boxArt.replace('{width}x{height}', '125x125')));
  };
  const deleteButton = input => {
    let newArr = state.savedClipsArr.slice(0);
    newArr = newArr.filter(item => item.url !== input);
    dispatch(savedClipsArr(newArr.slice(0)));
    window.localStorage.setItem('savedClipsArr', JSON.stringify(newArr.slice(0)));
  };
  return (
    <div>
      <HeaderDiv data-testid="savedClipsWrapper" onClick={() => handleToggle()}>
        <h3>
          Saved Clips
          <Arrow> {menu === false ? '▼' : '▲'}</Arrow>
        </h3>
      </HeaderDiv>
      <div data-testid="saveListWrapper">
        {state.savedClipsArr === null || state.savedClipsArr.length === 0 || menu === false ? null : (
          <ListDiv>
            <ol data-testid="savedClipsList">
              {state.savedClipsArr.map((item, index) => (
                <SavedClipsLi key={index}>
                  <div>
                    {item.title} {'-'}
                    <br />
                    {item.broadcaster} {'playing'} {item.game}
                    <br />
                    <SaveClipButtons onClick={() => playButton(item)} data-testid={`playButton${index}`}>Play</SaveClipButtons>
                    <SaveClipButtons onClick={() => deleteButton(item.url)} data-testid={`deleteButton${index}`}>Delete</SaveClipButtons>
                  </div>
                </SavedClipsLi>
              ))}
            </ol>
          </ListDiv>
        )}
      </div>
    </div>
  );
};

export default SavedClips;
