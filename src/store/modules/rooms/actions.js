import axios from 'axios';

const actions = {
  async connectToRoom({ commit }, data) {
    return axios.post(`/room/${ data.id }`, {
      password: data.password,
    })
        .then((roomData) => {
          commit('setGameData', roomData);
        });
  },
  async createRoom({}, form) {
    return axios.post('/room', {
      ...form,
    });
  },
};

export default actions;
