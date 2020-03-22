const buildServerMessage = (message) => ({
  message,
  time: Date.now(),
  player: {
    id: -1,
    userName: 'Игра',
    avatar: null,
  },
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
    dispatch('chat/addMessage', buildServerMessage('Игра завершена'), { root: true });
  },

  connectPlayer({ commit, dispatch }, data) {
    commit('addPlayer', data);
    dispatch('chat/addMessage', buildServerMessage(`Игрок ${data.userName} [${data.companyName}] подключился к игре`), { root: true });
  },
  reconnectPlayer({ dispatch }, data) {
    dispatch('chat/addMessage', buildServerMessage(`Игрок ${data.userName} [${data.companyName}] переподключился к игре`), { root: true });
  },
  disconnectPlayer({ commit, dispatch }, data) {
    commit('removePlayer', data);
    dispatch('chat/addMessage', buildServerMessage(`Игрок ${data.userName} [${data.companyName}] вышел из игры`), { root: true });
  },
  updatePlayer({ commit }, data) {
    commit('updatePlayer', data);
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

  updateCompany({ commit }, company) {
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
