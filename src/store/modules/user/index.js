import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  user: null,
  accessToken: null,
  refreshToken: null,
  // TODO put in .env
  authSecret: 'dHJ1c3RlZC1jbGllbnQ6WFk3a216b056bDEwMA==',
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
