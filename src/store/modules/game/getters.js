const getters = {
  currentSolutions: ({ currentSolutions }) => currentSolutions,
  oldSolutions: ({ currentPlayer }) => currentPlayer.solutions,
  players: ({ players, playersList }) => playersList.map((playerId) => players[playerId]),
};

export default getters;
