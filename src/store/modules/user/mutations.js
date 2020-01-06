const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SetRefreshToken(state, token) {
    state.refreshToken = token;
  },
  SetAccessToken(state, token) {
    state.accessToken = token;
  },
};

export default mutations;
