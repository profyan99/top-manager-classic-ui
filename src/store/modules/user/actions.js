import axios from 'axios';

const actions = {
  async getCurrentUser({ commit }) {
    const user = await axios.get('/api/me')
      .catch((_error) => {
      });
    commit('setUser', user);
  },
  async signIn({ commit }, form) {
    const user = await axios.post('/api/signin', {
      username: form.login,
      ...form,
    })
      .catch((_error) => {
      });
    commit('setUser', user);
  },
  signUp({}, form) {
    return axios.put('/api/signup', {
      userName: form.login,
      ...form,
    });
  },
};

export default actions;
