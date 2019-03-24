/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import styled from 'styled-components';
import ClientId from '../clientId';
import { Store } from '../store/index';
import { currentGameId, savedClipsArr, currentSavedClip } from '../actions/index';
import { STATUS_CODES } from 'http';

const ClipsDiv = styled.div`
  text-align: center;
  width: 55em;
  margin-left: 0.1em;
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NewClipButton = styled.button`
  margin-bottom: 0.5em;
  background-color: rgb(100, 65, 165);
  border: 0.2em solid black;
  outline: none;
  height: 3em;
  cursor: pointer;
  font-size: 0.9em;
  text-align: center;
  :active {
    color: white;
    box-shadow: none;
    transform: translateY(0.3em);
    outline: none;
  }
`;

const SaveClipButton = styled.button`
  margin-top: 0.5em;
  background-color: rgb(100, 65, 165);
  border: 0.2em solid black;
  outline: none;
  height: 2em;
  width: 6em;
  cursor: pointer;
  font-size: 1em;
  text-align: center;
  :active {
    color: white;
    box-shadow: none;
    transform: translateY(0.3em);
    outline: none;
`;

const ImgDiv = styled.div`
  margin-right: 1em;
  margin-left: 1em;
`;
const TwitchVideos = () => {
  const { state, dispatch } = useContext(Store);
  const [clipData, setClipData] = useState([]);
  async function Api() {
    try {
      const clips = `https://api.twitch.tv/helix/clips?game_id=${state.currentGameId}&first=25`;
      const returnData = await axios.get(clips, { headers: { 'Client-ID': ClientId } });
      setClipData(
        returnData.data.data.map(item => ({
          url: item.embed_url,
          title: item.title,
          creator: item.creator_name,
          broadcaster: item.broadcaster_name,
          views: item.view_count,
          id: item.game_id,
        })),
      );
    } catch (error) {
      alert('Embedded Twitch Video Failed to load, please try again');
    }
  }
  const saveClip = () => {
    let savedClipsData;
    if (state.savedClipsArr === null || state.savedClipsArr === undefined) {
      savedClipsData = [];
    } else {
      savedClipsData = state.savedClipsArr.slice(0);
    }
    if (savedClipsData.length + 1 === 11) {
      alert('Maximum number of saved clips exceeded');
      return;
    }
    for (let i = 0; i < savedClipsData.length; i++) {
      if (savedClipsData[i].url === clipData[0].url) {
        alert('This clip is already saved');
        return;
      }
    }
    savedClipsData.push({
      url: clipData[0].url, title: clipData[0].title, creator: clipData[0].creator, broadcaster: clipData[0].broadcaster,
      views: clipData[0].views, id: clipData[0].id, game: state.currentGame, boxArt: state.currentBoxArt
    });
    dispatch(savedClipsArr(savedClipsData.slice(0)));
    window.localStorage.setItem('savedClipsArr', JSON.stringify(savedClipsData.slice(0)));
  };
  useEffect(() => {
    if (state.currentSavedClip.length !== 0 && state.currentSavedClip[0].url !== clipData[0].url) {
      setClipData(state.currentSavedClip);
      return;
    }
    if (clipData.length === 0 || clipData[0].id !== state.currentGameId) {
      Api();
    }
  }, [Api, clipData, state.currentSavedClip]);
  const newClip = () => {
    if (state.currentSavedClip.length === 1) {
      dispatch(currentSavedClip([]));
      setClipData([]);
    }
    setClipData(clipData.slice(1));
  };
  const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  return (
    <ClipsDiv>
      <div>
        <h1>Twitch Clips</h1>
      </div>
      {clipData.length === 0 ? null : (
        <div>
          <NewClipButton onClick={() => newClip()} data-testid="newClipButton">
            Watch Another {state.currentGame} Clip
          </NewClipButton>
          <div>
            <iframe
              id="video"
              title={clipData.length === 0 ? 'None' : clipData[0].title}
              autoPlay={false}
              src={clipData.length === 0 ? null : clipData[0].url}
              height="500"
              width="700"
              frameBorder="<frameborder>"
              scrolling="<scrolling>"
              allowFullScreen="<allowfullscreen>"
              muted={false}
            />
          </div>
          <BottomDiv>
            <ImgDiv>
              <img src={state.currentBoxArt} alt="" />
            </ImgDiv>
            <div>
              <div>
                <span data-testid="clipDataTitle">
                  {'Title:'} {clipData[0].title.length > 80 ? clipData[0].title.slice(0, 80).concat('...') : clipData[0].title}
                </span>
                <br />
                <span>
                  {'Created by:'} {clipData[0].creator}
                </span>{' '}
                <br />
                <span>
                  {'Featuring:'} {clipData[0].broadcaster}{' '}
                </span>
                <br />
                <span>
                  {'Views:'} {formatNumber(clipData[0].views)}
                </span>
              </div>
              <SaveClipButton onClick={() => saveClip()} data-testid="newClipButton">
                Save Clip
              </SaveClipButton>
            </div>
            <ImgDiv>
              <img src={state.currentBoxArt} alt="" />
            </ImgDiv>
          </BottomDiv>
        </div>
      )}
    </ClipsDiv>
  );
};


export default TwitchVideos;
