import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import chat from './modules/chat';
import gameList from './modules/gameList';
import game from './modules/game';
import notification from './modules/notification';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    chat,
    gameList,
    game,
    notification,
  },
  plugins: [],
});

export default store;
