const getters = {
  currentPlayer: ({ gameData: { players } }, _getters, { user }) => {
    return players.find((player) => player.userName === user.user.userName);
  },
  currentSolutions: ({ currentSolutions }) => currentSolutions,
  oldSolutions: ({ currentPlayer }) => currentPlayer.solutions,
  players: ({ players, playersList }) => playersList.map((playerId) => players[playerId]),
};

export default getters;
