import Vue from 'vue';

const mutations = {
  setRooms(state, rooms) {
    state.roomsIds = [];
    state.rooms = {};
    rooms.forEach((room) => {
      Vue.set(state.rooms, room.id, room);
      state.roomsIds.push(room.id);
    });
  },
  addRoom(state, rooms) {
    rooms.forEach((room) => {
      Vue.set(state.rooms, room.id, room);
      state.roomsIds.push(room.id);
    });
  },
  updateRoom(state, room) {
    state.rooms[room.id].name = room.name;
    state.rooms[room.id].maxPlayers = room.maxPlayers;
    state.rooms[room.id].currentPlayers = room.currentPlayers;
    state.rooms[room.id].locked = room.locked;
    state.rooms[room.id].tournament = room.tournament;
    state.rooms[room.id].scenario = room.scenario;
    state.rooms[room.id].scenarioName = room.scenarioName;
    state.rooms[room.id].players = room.players;
    state.rooms[room.id].requirement = room.requirement;
    state.rooms[room.id].state = room.state;
    state.rooms[room.id].maxRounds = room.maxRounds;
    state.rooms[room.id].currentRound = room.currentRound;
  },
  removeRoom(state, room) {
    Vue.delete(state.rooms, room.id);
    state.roomsIds = state.roomsIds.filter((id) => id !== room.id);
  },
  setScenarios(state, scenarios) {
    state.scenarios = scenarios;
  },
};

export default mutations;
