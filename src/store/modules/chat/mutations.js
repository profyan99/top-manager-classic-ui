const mutations = {
  setMessages(state, messages) {
    state.messages = messages;
  },
  addMessage(state, message) {
    state.messages.push(message);
  },
  clearMessages(state) {
    state.messages = [];
  },
};

export default mutations;
