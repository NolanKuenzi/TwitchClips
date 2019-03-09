/* eslint-disable */
import React from 'react';
import { render, cleanup, fireEvent, wait } from 'react-testing-library';
import regeneratorRuntime, { async } from 'regenerator-runtime'; /* eslint-disable-line */
import axios from 'axios';
import TwitchVideo from './displayClips';

jest.mock('axios');

afterEach(cleanup);

describe('<TwitchVideo /> component', () => {
  it('Displays the current clip', () => { });
});
