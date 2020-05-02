import axios from 'axios';

const actions = {
  async getCurrentUser({ commit }) {
    return axios.get('/profile')
      .then((user) => {
        commit('setUser', user);
      });
  },
  async signIn({ commit }, form) {
    return axios.post('/signin', form)
      .then(({ accessToken, refreshToken }) => {
        commit('SetAccessToken', accessToken);
        commit('SetRefreshToken', refreshToken);
      });
  },
  signInThrowSocial({ commit }, { access_token, refresh_token }) {
    commit('SetAccessToken', access_token);
    commit('SetRefreshToken', refresh_token);
  },
  signUp(_store, { _repeatedPassword, ...other }) {
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
    return axios.post('/auth/token', {
      refreshToken: oldRefreshToken,
    })
      .then(({ accessToken, refreshToken }) => {
        commit('SetAccessToken', accessToken);
        commit('SetRefreshToken', refreshToken);
      });
  },
};

export default actions;
