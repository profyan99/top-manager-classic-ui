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
  addRoom(state, room) {
    Vue.set(state.rooms, room.id, room);
    state.roomsIds.push(room.id);
  },
  updateRoom(state, room) {
    state.rooms[room.id] = room;
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
