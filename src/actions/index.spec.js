import {
  currentGameId,
  currentGame,
  currentBoxArt,
  savedClipsArr,
  currentSavedClip,
} from './index';

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
  test('savedClipsArr sets the saved clips array', () => {
    const newSavedClipArr = ['https://clip.twitch.tv/_clip_33983'];
    const expectedAction = item => ({
      type: 'SAVED_CLIPS_ARR',
      item,
    });
    expect(savedClipsArr(newSavedClipArr.slice(0))).toEqual(
      expectedAction(newSavedClipArr.slice(0)),
    );
  });
  test('currentSavedClip updates the current saved clip (that is being played)', () => {
    const currentClip = ['https://clip.twitch.tv/_clip_34683'];
    const expectedAction = item => ({
      type: 'CURRENT_SAVED_CLIP',
      item,
    });
    expect(currentSavedClip(currentClip)).toEqual(expectedAction(currentClip));
  });
});
