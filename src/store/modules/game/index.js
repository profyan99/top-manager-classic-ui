import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  gameData: null,
  currentSolutions: {
    price: 0,
    production: 0,
    marketing: 0,
    investments: 0,
    nir: 0,
  },
  company: {},
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
