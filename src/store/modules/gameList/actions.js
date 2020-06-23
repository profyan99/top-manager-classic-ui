import axios from 'axios';

const actions = {
  async connectToGame({ commit, state }, { id }) {
    const requestBody = {
      id,
      ...state.connectData,
    };
    return axios.post(`/games/${id}`, requestBody).then((gameData) => {
      commit('game/clearGame', {}, { root: true });
      commit('game/setGameData', gameData.game, { root: true });
      commit('game/updateCompany', gameData.player, { root: true });
    });
  },
  async createGame(_store, form) {
    return axios.post('/games', {
      ...form,
      periodDuration: form.periodDuration * 60,
    });
  },
  async getGames({ commit }) {
    return axios.get('/games').then(({ games, meta }) => {
      commit('setGames', games);
      commit('setMeta', meta);
    });
  },
  async getScenarios({ commit }) {
    return axios.get('/scenarios').then((data) => commit('setScenarios', data));
  },
  setGameConnectionData({ commit }, data) {
    commit('setGameConnectionData', data);
  },
  addGame({ commit }, game) {
    commit('addGame', game);
  },
  updateGame({ commit }, game) {
    commit('updateGame', game);
  },
  removeGame({ commit }, game) {
    commit('removeGame', game);
  },
  updateMeta({ commit }, meta) {
    commit('setMeta', meta);
  },
};

export default actions;
