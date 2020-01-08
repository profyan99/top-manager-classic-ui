import axios from 'axios';

const actions = {
  sendMessage({}, { message, roomId }) {
    const url = roomId ? `/room/${ roomId }/message` : '/rooms/message';
    return axios.post(url, {
      message,
    });
  },
  addMessageWebsocket({ commit }, message) {
    commit('addMessage', message);
  },
};

export default actions;
