const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SetRefreshToken(state, token) {
    state.refreshToken = token;
    localStorage.setItem('refreshToken', token);
  },
  SetAccessToken(state, token) {
    state.accessToken = token;
    localStorage.setItem('accessToken', token);
  },
};

export default mutations;
