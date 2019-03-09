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

export { currentGameId, currentGame, currentBoxArt };
