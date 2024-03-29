import Vue from 'vue';

const addPlayerCommon = (state, data) => {
  Vue.set(state.players, data.id, data);
  state.playersList.push(data.id);
};

const updatePlayerCommon = (state, data) => {
  state.players[data.id] = {
    ...data,
  };
};

const mutations = {
  setGameData(state, data) {
    state.gameData = {
      ...data,
    };
    state.players = {};
    state.playersList = [];
    data.players.forEach((player) => {
      addPlayerCommon(state, player);
    });
  },
  updateGameData(state, data) {
    state.gameData = {
      ...data,
    };
    data.players.forEach((player) => {
      updatePlayerCommon(state, player);
    });
  },

  updateCompany(state, company) {
    state.currentPlayer = {
      ...company,
    };
  },

  addPlayer(state, data) {
    addPlayerCommon(state, data);
  },
  updatePlayer(state, data) {
    updatePlayerCommon(state, data);
  },
  removePlayer(state, data) {
    Vue.delete(state.players, data.id);
    Vue.delete(state.playersList, state.playersList.indexOf(data.id));
  },

  setGameTick(state, amount) {
    state.currentSecond = amount;
  },
  updateGameTick(state, amount) {
    state.currentSecond += amount;
  },
};

export default mutations;
