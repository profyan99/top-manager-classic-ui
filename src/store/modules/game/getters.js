const getters = {
  oldSolutions: ({ currentPlayer }) => currentPlayer.solutions,
  players: ({ players, playersList }) => playersList.map((playerId) => players[playerId]),
};

export default getters;
