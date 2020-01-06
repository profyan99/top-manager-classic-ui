import Rooms from '~/pages/rooms';
import Game from '~/pages/game';

export default [
  {
    path: '/',
    component: Rooms,
    name: 'rooms',
  },
  {
    name: 'game',
    path: '/game/:roomId',
    component: Game,
  },
];
