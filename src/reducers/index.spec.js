/* eslint-disable */
import { reducer, initialState } from './index';

describe('reducer function', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should handle CURRENT_GAMEID action', () => {
    const newGameId = '49748';
    const action = { type: 'CURRENT_GAMEID', item: newGameId };
    expect(reducer(initialState, action)).toEqual({
      currentGameId: newGameId,
      currentGame: 'Fortnite',
      currentBoxArt: 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-125x125.jpg',
    });
  });
  it('should handle CURRENT_GAME action', () => {
    const newGame = 'RuneScape';
    const action = { type: 'CURRENT_GAME', item: newGame };
    expect(reducer(initialState, action)).toEqual({
      currentGameId: '33214',
      currentGame: newGame,
      currentBoxArt: 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-125x125.jpg',
    });
  });
  it('should handle CURRENT_BOXART action', () => {
    const newBoxArt = 'https://box_art.twitch.tv/box_art_2';
    const action = { type: 'CURRENT_BOXART', item: newBoxArt };
    expect(reducer(initialState, action)).toEqual({
      currentGameId: '33214',
      currentGame: 'Fortnite',
      currentBoxArt: newBoxArt,
    });
  });
});
