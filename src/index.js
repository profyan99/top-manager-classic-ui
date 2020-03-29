import Vue from 'vue';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFile,
  faLock,
  faSearch,
  faSignOutAlt,
  faTimes,
  faTrophy,
  faUserPlus,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faVk } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vSelect from 'vue-select';
import './styles/app.sass';

import Layout from './components/Layout.vue';
import routes from './routes';
import store from './store';
import '../index.html';
import './axios';

library.add(
  faSearch,
  faLock,
  faTrophy,
  faFile,
  faTimes,
  faSignOutAlt,
  faUserPlus,
  faVk,
  faGoogle,
  faChevronDown,
  faChevronUp,
);

Vue.component('icon', FontAwesomeIcon);
Vue.component('v-select', vSelect);
Vue.use(Router);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

const router = new Router({
  routes,
  mode: 'history',
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: { Layout },
  router,
  store,
});
