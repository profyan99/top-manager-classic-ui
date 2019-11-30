import axios from 'axios';

const actions = {
  async getCurrentUser({ commit }) {
    const user = await axios.get('/api/me')
      .catch((_error) => {
      });
    commit('setUser', user);
  },
};

export default actions;
