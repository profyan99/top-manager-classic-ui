import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  notifications: [],
  lastNotificationId: 0,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
