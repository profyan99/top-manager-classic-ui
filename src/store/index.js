import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import chat from './modules/chat';
import rooms from './modules/rooms';
import game from './modules/game';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    chat,
    rooms,
    game,
  },
  plugins: [],
});

export default store;
