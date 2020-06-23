import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import initial from './initial';

const state = {
  ...initial,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
