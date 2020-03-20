const actions = {
  setGameDataWebsocket({ commit }, data) {
    commit('setGameData', data);
  },
  updateGameDataWebsocket({ commit }, data) {
    commit('updateGameData', data);
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
  updateCompanyWebsocket({ commit }, company) {
    commit('updateCompany', company);
  },

  setTime({ commit }, time) {
    commit('setGameTick', time);
  },
  updateTime({ commit }) {
    commit('updateGameTick', 1);
  },
};

export default actions;
