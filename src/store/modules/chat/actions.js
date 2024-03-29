import axios from 'axios';

const actions = {
  sendMessage({}, { message, roomId }) {
    const url = roomId ? `/games/${roomId}/messages` : '/games/messages';
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
