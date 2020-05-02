import Vue from 'vue';

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
