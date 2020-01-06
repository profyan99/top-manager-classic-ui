import axios from 'axios';
import qs from 'qs';

const actions = {
  async getCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/profile')
          .then((user) => {
            commit('setUser', user);
            resolve();
          })
          .catch(reject);
    });
  },
  async signIn({ commit, state: { authSecret } }, form) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${ authSecret }`,
        },
        data: qs.stringify({
          username: form.userName,
          password: form.password,
          grant_type: 'password',
        }),
        url: '/oauth/token',
      };
      axios(options)
          .then(({ access_token, refresh_token }) => {
            commit('SetAccessToken', access_token);
            commit('SetRefreshToken', refresh_token);
            resolve();
          })
          .catch(reject);
    });
  },
  signInThrowSocial({ commit }, { access_token, refresh_token }) {
    commit('SetAccessToken', access_token);
    commit('SetRefreshToken', refresh_token);
    return Promise.resolve();
  },
  signUp({}, form) {
    return axios.put('/signup', {
      ...form,
    });
  },
  async logout({ commit }) {
    commit('setUser', null);
    commit('SetRefreshToken', null);
    commit('SetAccessToken', null);
  },
};

export default actions;
