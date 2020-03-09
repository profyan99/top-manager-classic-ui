import axios from 'axios';

const actions = {
  sendMessage({}, { message, roomId }) {
    const url = roomId ? `/games/${roomId}/message` : '/games/message';
    return axios.post(url, {
      message,
    });
  },
  addMessageWebsocket({ commit }, message) {
    commit('addMessage', message);
  },
  clearMessages({ commit }) {
    commit('clearMessages');
  },
};

export default actions;
