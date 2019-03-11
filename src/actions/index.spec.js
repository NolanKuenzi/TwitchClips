import { currentGameId, currentGame, currentBoxArt } from './index';

describe('Action objects returned from action-creator functions', () => {
  test('currentGameId updates the current game id', () => {
    const newGameId = '47398';
    const expectedAction = item => ({
      type: 'CURRENT_GAMEID',
      item,
    });
    expect(currentGameId(newGameId)).toEqual(expectedAction(newGameId));
  });
  test('currentGame updates the current game', () => {
    const newGame = 'RuneScape';
    const expectedAction = item => ({
      type: 'CURRENT_GAME',
      item,
    });
    expect(currentGame(newGame)).toEqual(expectedAction(newGame));
  });
  test('currentBoxArt updates the current box art', () => {
    const newBoxArt = 'https://box_art.twitch.tv/box_art_3';
    const expectedAction = item => ({
      type: 'CURRENT_BOXART',
      item,
    });
    expect(currentBoxArt(newBoxArt)).toEqual(expectedAction(newBoxArt));
  });
});
