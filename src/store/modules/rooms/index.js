import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  rooms: {},
  roomsIds: [],
  scenarios: [],
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
