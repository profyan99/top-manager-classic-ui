import axios from 'axios';

const actions = {
  async connectToRoom({ commit }, data) {
    return axios.post(`/games/${data.id}`, data)
      .then((roomData) => {
        commit('game/setGameData', roomData.game, { root: true });
        commit('game/updateCompany', roomData.player, { root: true });
      });
  },
  async createRoom(_store, form) {
    return axios.post('/games', {
      ...form,
      periodDuration: form.periodDuration * 60,
    });
  },
  async getRooms({ commit }) {
    return axios.get('/games')
      .then((data) => commit('setRooms', data));
  },
  async getScenarios({ commit }) {
    return axios.get('/scenarios')
      .then((data) => commit('setScenarios', data));
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
