import axios from 'axios';

const actions = {
  async connectToRoom({ commit }, data) {
    return axios.post(`/api/room/${ data.id }`, {
      password: data.password,
    })
      .then((roomData) => {
        commit('setGameData', roomData);
      });
  },
  async createRoom({}, form) {
    return axios.post('/api/room', {
      ...form,
    });
  },
};

export default actions;
