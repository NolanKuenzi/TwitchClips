const currentGameId = item => ({
  type: 'CURRENT_GAMEID',
  item,
});

const currentGame = item => ({
  type: 'CURRENT_GAME',
  item,
});

const currentBoxArt = item => ({
  type: 'CURRENT_BOXART',
  item,
});

const savedClipsArr = item => ({
  type: 'SAVED_CLIPS_ARR',
  item,
});

const currentSavedClip = item => ({
  type: 'CURRENT_SAVED_CLIP',
  item,
});

export { currentGameId, currentGame, currentBoxArt, savedClipsArr, currentSavedClip };
