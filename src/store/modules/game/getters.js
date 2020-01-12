const getters = {
  currentPlayer: ({ gameData: { players } }, getters, { user }) => {
    return players.find((player) => player.userName === user.user.userName);
  },
};

export default getters;
