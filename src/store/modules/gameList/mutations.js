import Vue from 'vue';

const mutations = {
  setGames(state, games) {
    state.gamesIds = [];
    state.games = {};
    games.forEach((game) => {
      Vue.set(state.games, game.id, game);
      state.gamesIds.push(game.id);
    });
  },
  addGame(state, game) {
    Vue.set(state.games, game.id, game);
    state.gamesIds.push(game.id);
  },
  updateGame(state, game) {
    state.games[game.id] = game;
  },
  removeGame(state, game) {
    Vue.delete(state.games, game.id);
    state.gamesIds = state.gamesIds.filter((id) => id !== game.id);
  },
  setScenarios(state, scenarios) {
    state.scenarios = scenarios;
  },
  setMeta(state, meta) {
    state.meta = {
      ...meta,
    };
  },
  setGameConnectionData(state, data) {
    state.connectData = data;
  },
};

export default mutations;
