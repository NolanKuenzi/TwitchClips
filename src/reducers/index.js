const initialState = {
  currentGameId: '33214',
  currentGame: 'Fortnite',
  currentBoxArt: 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-125x125.jpg',
  savedClipsArr: JSON.parse(window.localStorage.getItem('savedClipsArr')),
  currentSavedClip: [],
};
function reducer(state, action) {
  if (action.type === 'CURRENT_GAMEID') {
    return Object.assign({}, state, {
      currentGameId: action.item,
    });
  }
  if (action.type === 'CURRENT_GAME') {
    return Object.assign({}, state, {
      currentGame: action.item,
    });
  }
  if (action.type === 'CURRENT_BOXART') {
    return Object.assign({}, state, {
      currentBoxArt: action.item,
    });
  }
  if (action.type === 'SAVED_CLIPS_ARR') {
    return Object.assign({}, state, {
      savedClipsArr: action.item,
    });
  }
  if (action.type === 'CURRENT_SAVED_CLIP') {
    return Object.assign({}, state, {
      currentSavedClip: action.item,
    });
  }
  return state;
}

export { reducer, initialState };
