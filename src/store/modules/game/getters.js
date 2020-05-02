const getters = {
  oldSolutions: ({ currentPlayer }) => currentPlayer.solutions,
  players: ({ players, playersList }) => playersList.map((playerId) => players[playerId]),
  playerState: ({ currentPlayer }) => currentPlayer.state,
};

export default getters;
