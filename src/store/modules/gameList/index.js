import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  games: {},
  gamesIds: [],
  scenarios: [],
  meta: {
    playersAmount: 0,
  },
  connectData: {
    password: '',
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
