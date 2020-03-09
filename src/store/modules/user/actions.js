import axios from 'axios';

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
  async signIn({ commit }, form) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        data: {
          ...form,
        },
        url: '/signin',
      };
      axios(options)
        .then(({ accessToken, refreshToken }) => {
          commit('SetAccessToken', accessToken);
          commit('SetRefreshToken', refreshToken);
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
  signUp({}, { repeatedPassword, ...other }) {
    return axios.post('/signup', other);
  },
  async logout({ commit }) {
    commit('setUser', null);
    commit('SetRefreshToken', null);
    commit('SetAccessToken', null);
  },
  fetchAuthTokens({ commit }) {
    commit('SetAccessToken', localStorage.getItem('accessToken'));
    commit('SetRefreshToken', localStorage.getItem('refreshToken'));
  },
  refreshToken({ state: { refreshToken: oldRefreshToken }, commit }) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        data: {
          refreshToken: oldRefreshToken,
        },
      };
      axios(options)
        .then(({ accessToken, refreshToken }) => {
          commit('SetAccessToken', accessToken);
          commit('SetRefreshToken', refreshToken);
          resolve();
        })
        .catch(reject);
    });
  },
};

export default actions;
