/* eslint-disable */
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import TwitchGames from '../containers/topGames';
import TwitchVideo from '../containers/displayClips';
import SavedClips from '../containers/saveClips';

import { Provider } from '../store/index';

const Body = createGlobalStyle`
  body {
    background-color: rgb(100, 65, 165);
  }`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  flex: 1;
  flex-wrap: wrap-reverse;
`;

const Main = () => {
  return (
    <div>
      <Provider>
        <Body />
        <ContentDiv>
          <TwitchGames />
          <TwitchVideo />
          <SavedClips />
        </ContentDiv>
      </Provider>
    </div>
  );
};

export default Main;
