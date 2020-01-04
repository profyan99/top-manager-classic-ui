import Rooms from '~/pages/rooms';
import Game from '~/pages/game';
import Login from '~/pages/login';

export default [
  {
    path: '/',
    component: Rooms,
    name: 'rooms',
  },
  {
    path: '/signin',
    component: Login,
    name: 'login',
  },
  {
    name: 'game',
    path: '/game/:roomId',
    component: Game,
  },
];
