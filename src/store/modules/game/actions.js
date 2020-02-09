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
  updateSolutionsPrice({ commit }, price) {
    commit('updateSolutionsPrice', price);
  },
  updateSolutionsProduction({ commit }, production) {
    commit('updateSolutionsProduction', production);
  },
  updateSolutionsMarketing({ commit }, marketing) {
    commit('updateSolutionsMarketing', marketing);
  },
  updateSolutionsInvestments({ commit }, investments) {
    commit('updateSolutionsInvestments', investments);
  },
  updateSolutionsNir({ commit }, nir) {
    commit('updateSolutionsNir', nir);
  },
};

export default actions;
