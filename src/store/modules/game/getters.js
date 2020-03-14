const getters = {
  currentPlayer: ({ gameData: { players } }, _getters, { user }) => {
    return players.find((player) => player.userName === user.user.userName);
  },
  currentSolutions: ({ currentSolutions }) => currentSolutions,
  oldSolutions: ({ solutions }) => solutions,
};

export default getters;
