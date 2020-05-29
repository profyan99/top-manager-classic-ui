import axios from 'axios';

const sendServerMessage = (dispatch, message) => {
  const payload = {
    message,
    time: Date.now(),
    isServer: true,
  };
  dispatch('chat/addMessage', payload, { root: true });
  dispatch(
    'notification/addNotification',
    {
      type: 'GAME',
      text: message,
    },
    { root: true },
  );
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
      `${
        data.userName
      } владелец ${data.companyName.toUpperCase()} подключился к игре`,
    );
  },
  reconnectPlayer({ dispatch }, data) {
    sendServerMessage(
      dispatch,
      `${
        data.userName
      } владелец ${data.companyName.toUpperCase()} переподключился к игре`,
    );
  },
  disconnectPlayer({ commit, dispatch }, data) {
    commit('removePlayer', data);
    sendServerMessage(
      dispatch,
      `${
        data.userName
      } владелец ${data.companyName.toUpperCase()} вышел из игры`,
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
  setNewGame({ commit }, game) {
    commit('setNewGame', game);
  },
  clearNewGame({ commit }) {
    commit('clearNewGame');
  },
  playerRejectsRestart({ dispatch }, data) {
    sendServerMessage(
      dispatch,
      `${data.userName} отказался принять участие в новой игре`,
    );
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
  restartGame({ state }) {
    return axios.post(`/games/${state.gameData.id}/restart`);
  },
  rejectRestartGame({ state }) {
    return axios.delete(`/games/${state.newGame.id}/restart`);
  },
  clearGame({ commit }) {
    commit('clearGame');
  },
};

export default actions;
