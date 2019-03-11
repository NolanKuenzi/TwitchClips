/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import styled from 'styled-components';
import ClientId from '../clientId';
import { Store } from '../store/index';

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
  margin-top: 0.2em;
  margin-left: 2em;
  margin-right: 2em;
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

const TwitchVideos = () => {
  const { state } = useContext(Store);
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
  useEffect(() => {
    if (clipData.length === 0 || clipData[0].id !== state.currentGameId) {
      Api();
    }
  }, [Api, clipData, state.currentGameId]);
  const newClip = () => {
    if (clipData.length === 0) {
      return;
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
          <div>
            <p data-testid="currentGame">Currently Watching Top {state.currentGame} Clips:</p>
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
            <div>
              <img src={state.currentBoxArt} alt="" />
            </div>
            <div>
              <div>
                <span data-testid="clipDataTitle">
                  {'Title:'} {clipData.length === 0 ? null : clipData[0].title}
                </span>
                <br />
                <span>
                  {'Created by:'} {clipData.length === 0 ? null : clipData[0].creator}
                </span>{' '}
                <br />
                <span>
                  {'Featuring:'} {clipData.length === 0 ? null : clipData[0].broadcaster}{' '}
                </span>
                <br />
                <span>
                  {'Views:'} {clipData.length === 0 ? null : formatNumber(clipData[0].views)}
                </span>
              </div>
              <NewClipButton onClick={() => newClip()} data-testid="newClipButton">
                Watch Another {state.currentGame} Clip
              </NewClipButton>
            </div>
            <div>
              <img src={state.currentBoxArt} alt="" />
            </div>
          </BottomDiv>
        </div>
      )}
    </ClipsDiv>
  );
};

export default TwitchVideos;
