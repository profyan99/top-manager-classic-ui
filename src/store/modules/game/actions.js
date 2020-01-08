const actions = {
  setGameDataWebsocket({ commit }, data) {
    commit('setGameData', data);
  },
  updateGameDataWebsocket({ commit }, data) {
    commit('updateGameData', data);
  },
  updateGameTickWebsocket({ commit, state: { gameData } }, data) {
    commit('updateGameTick', {
      type: gameData.state === 'PREPARE' ? 'prepareSecond' : 'currentSecond',
      ...data,
    });
  },
};

export default actions;
