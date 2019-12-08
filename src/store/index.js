import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import chat from './modules/chat';
import rooms from './modules/rooms';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    chat,
    rooms,
  },
  plugins: [],
});

export default store;
