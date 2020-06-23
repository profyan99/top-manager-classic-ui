const actions = {
  addNotification({ commit }, data) {
    commit('addNotification', data);
  },
  removeNotification({ commit }, id) {
    commit('removeNotification', id);
  },
  removeAllNotifications({ commit }) {
    commit('removeAllNotifications');
  },
};

export default actions;
