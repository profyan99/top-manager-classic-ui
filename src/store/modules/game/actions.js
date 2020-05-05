import axios from 'axios';

const sendServerMessage = (dispatch, message) => {
  const payload = {
    message,
    time: Date.now(),
    isServer: true,
  };
  dispatch('chat/addMessage', payload, { root: true });
};

const actions = {
  setGameData({ commit }, data) {
    commit('setGameData', data);
  },
  updateGameData({ commit, dispatch }, data) {
    commit('updateGameData', data);
    sendServerMessage(dispatch, `Начался ${data.currentPeriod} квартал`);
  },
  finishGame({ commit, dispatch }, data) {
    commit('updateGameData', data);
    commit('setGameTick', 0);
    sendServerMessage(dispatch, 'Игра завершена');
  },

  connectPlayer({ commit, dispatch }, data) {
    commit('addPlayer', data);
    sendServerMessage(
      dispatch,
      `${data.userName} владелец ${data.companyName.toUpperCase()} подключился к игре`,
    );
  },
  reconnectPlayer({ dispatch }, data) {
    sendServerMessage(
      dispatch,
      `${data.userName} владелец ${data.companyName.toUpperCase()} переподключился к игре`,
    );
  },
  disconnectPlayer({ commit, dispatch }, data) {
    commit('removePlayer', data);
    sendServerMessage(
      dispatch,
      `${data.userName} владелец ${data.companyName.toUpperCase()} вышел из игры`,
    );
  },
  updatePlayer({ commit }, data) {
    commit('updatePlayer', data);
  },

  updateCompany({ commit }, company) {
    commit('updateCompany', company);
  },

  setTime({ commit }, time) {
    commit('setGameTick', time);
  },
  updateTime({ commit }) {
    commit('updateGameTick', 1);
  },

  sendSolutions({ state }, solutions) {
    return axios.post(`/games/${state.gameData.id}/solutions`, solutions);
  },
  disconnectFromGame({ state }) {
    return axios.delete(`/games/${state.gameData.id}`);
  },
  setCompanyName({ state }, companyName) {
    return axios.post(`/games/${state.gameData.id}/company`, { companyName });
  },
};

export default actions;
