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
  margin-top: 11em;
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
      <HeaderDiv data-testid="dropDownWrapper" onClick={() => handleToggle()}>
        <h3>
          Saved Clips
          <Arrow> {menu === false ? '▼' : '▲'}</Arrow>
        </h3>
      </HeaderDiv>
      {state.savedClipsArr === null || state.savedClipsArr.length === 0 || menu === false ? null : (
        <ListDiv>
          <ol>
            {state.savedClipsArr.map((item, index) => (
              <SavedClipsLi key={index}>
                <div>
                  {item.title}
                  <br />
                  {item.broadcaster} {'playing'} {item.game}
                  <br />
                  <button onClick={() => playButton(item)}>Play</button>
                  <button onClick={() => deleteButton(item.url)}>Delete</button>
                </div>
              </SavedClipsLi>
            ))}
          </ol>
        </ListDiv>
      )}
    </div>
  );
};

export default SavedClips;
