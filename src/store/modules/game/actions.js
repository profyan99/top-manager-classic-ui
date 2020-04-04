import axios from 'axios';

const buildServerMessage = (message) => ({
  message,
  time: Date.now(),
  isServer: true,
});


const actions = {
  setGameData({ commit }, data) {
    commit('setGameData', data);
  },
  updateGameData({ commit, dispatch }, data) {
    commit('updateGameData', data);
    const msg = data.currentPeriod === 1
      ? 'Началась игра'
      : `Начался ${data.currentPeriod} период`;
    dispatch('chat/addMessage', buildServerMessage(msg), { root: true });
  },
  finishGame({ commit, dispatch }, data) {
    commit('updateGameData', data);
    commit('setGameTick', 0);
    dispatch('chat/addMessage', buildServerMessage('Игра завершена'), { root: true });
  },

  connectPlayer({ commit, dispatch }, data) {
    commit('addPlayer', data);
    dispatch(
      'chat/addMessage',
      buildServerMessage(`Игрок ${data.userName} - ${data.companyName} подключился к игре`),
      { root: true },
    );
  },
  reconnectPlayer({ dispatch }, data) {
    dispatch(
      'chat/addMessage',
      buildServerMessage(`Игрок ${data.userName} - ${data.companyName} переподключился к игре`),
      { root: true },
    );
  },
  disconnectPlayer({ commit, dispatch }, data) {
    commit('removePlayer', data);
    dispatch(
      'chat/addMessage',
      buildServerMessage(`Игрок ${data.userName} - ${data.companyName} вышел из игры`),
      { root: true },
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
};

export default actions;
