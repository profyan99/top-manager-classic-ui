import axios from 'axios';

const actions = {
  async connectToRoom({ commit }, data) {
    return axios.post(`/room/${data.id}`, data)
      .then((roomData) => {
        commit('game/setGameData', roomData.body, { root: true });
      });
  },
  async createRoom({}, form) {
    return axios.post('/room', {
      ...form,
      roomPeriodDelay: form.roomPeriodDelay * 60,
    });
  },
  async getRooms({ commit }) {
    return axios.get('/rooms')
      .then((data) => commit('setRooms', data.body));
  },
  async getScenarios({ commit }) {
    return axios.get('/scenarios')
      .then((data) => commit('setScenarios', data.body));
  },
  addRoomWebsocket({ commit }, room) {
    commit('addRoom', room);
  },
  updateRoomWebsocket({ commit }, room) {
    commit('updateRoom', room);
  },
  removeRoomWebsocket({ commit }, room) {
    commit('removeRoom', room);
  },
};

export default actions;
