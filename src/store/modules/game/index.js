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
  stats: {
    rating: 0,
    price: 0,
    revenue: 0,
    netProfit: 0,
    accumulatedProfit: 0,
    marketingPart: 0,
  },
  company: {},
  solutions: {
    price: 0,
    production: 0,
    marketing: 0,
    investments: 0,
    nir: 0,
  },
  currentSecond: 0,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
