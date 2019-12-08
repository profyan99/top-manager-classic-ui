import axios from 'axios';

const actions = {
  sendMessage({ commit }, content) {
    commit('addMessage', {
      id: Math.random() * 100000,
      user: {
        id: 0,
        userName: 'Kostya',
      },
      content,
      date: new Date(Date.now()),
    });
    return Promise.resolve();
  },
};

export default actions;
