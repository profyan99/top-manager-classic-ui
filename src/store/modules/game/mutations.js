const mutations = {
  setGameData(state, data) {
    state.gameData = data;
  },
  updateGameData(state, data) {
    /*state.gameData.name = data.name;
    state.gameData.maxPlayers = data.maxPlayers;
    state.gameData.currentPlayers = data.currentPlayers;
    state.gameData.locked = data.locked;
    state.gameData.tournament = data.tournament;
    state.gameData.scenario = data.scenario;
    state.gameData.scenarioName = data.scenarioName;
    state.gameData.players = data.players;
    state.gameData.requirement = data.requirement;
    state.gameData.state = data.state;
    state.gameData.maxRounds = data.maxRounds;
    state.gameData.currentRound = data.currentRound;
    state.gameData.currentSecond = data.currentSecond;
    state.gameData.prepareSecond = data.prepareSecond;
    state.gameData.players = [...data.players];*/
    state.gameData = {
      ...data,
    };
  },
  updateGameTick(state, { type, amount }) {
    state.gameData[type] = amount;
  },
};

export default mutations;
