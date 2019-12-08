const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  addRoom(state, room) {
    state.rooms.push(room);
  },
};

export default mutations;
