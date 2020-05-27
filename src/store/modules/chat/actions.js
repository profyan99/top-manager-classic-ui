import axios from 'axios';

const actions = {
  sendMessage(_store, { message, gameId }) {
    const url = gameId ? `/games/${gameId}/messages` : '/games/messages';
    return axios.post(url, {
      message,
    });
  },
  addMessage({ commit }, message) {
    commit('addMessage', message);
  },
  clearMessages({ commit }) {
    commit('clearMessages');
  },
};

export default actions;
