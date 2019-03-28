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
      savedClipsArr: JSON.parse(window.localStorage.getItem('savedClipsArr')),
      currentSavedClip: [],
    });
  });
  it('should handle CURRENT_GAME action', () => {
    const newGame = 'RuneScape';
    const action = { type: 'CURRENT_GAME', item: newGame };
    expect(reducer(initialState, action)).toEqual({
      currentGameId: '33214',
      currentGame: newGame,
      currentBoxArt: 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-125x125.jpg',
      savedClipsArr: JSON.parse(window.localStorage.getItem('savedClipsArr')),
      currentSavedClip: [],
    });
  });
  it('should handle CURRENT_BOXART action', () => {
    const newBoxArt = 'https://box_art.twitch.tv/box_art_2';
    const action = { type: 'CURRENT_BOXART', item: newBoxArt };
    expect(reducer(initialState, action)).toEqual({
      currentGameId: '33214',
      currentGame: 'Fortnite',
      currentBoxArt: newBoxArt,
      savedClipsArr: JSON.parse(window.localStorage.getItem('savedClipsArr')),
      currentSavedClip: [],
    });
  });
  it('should handle SAVED_CLIPS_ARR action', () => {
    const newArr = ['https://clips.twitch.tv/_clip_34683', 'https://clips.twitch.tv/_clip_84453'];
    const action = { type: 'SAVED_CLIPS_ARR', item: newArr.slice(0) };
    expect(reducer(initialState, action)).toEqual({
      currentGameId: '33214',
      currentGame: 'Fortnite',
      currentBoxArt: 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-125x125.jpg',
      savedClipsArr: newArr.slice(0),
      currentSavedClip: [],
    });
  });
  it('should handle CURRENT_SAVED_CLIP action', () => {
    const currentSvdClip = ['https://clip.twitch.tv/_clip_456503'];
    const action = { type: 'CURRENT_SAVED_CLIP', item: currentSvdClip.slice(0) };
    expect(reducer(initialState, action)).toEqual({
      currentGameId: '33214',
      currentGame: 'Fortnite',
      currentBoxArt: 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-125x125.jpg',
      savedClipsArr: JSON.parse(window.localStorage.getItem('savedClipsArr')),
      currentSavedClip: currentSvdClip.slice(0),
    });
  });
});
