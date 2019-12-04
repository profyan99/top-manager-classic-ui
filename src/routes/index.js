import Rooms from '~/pages/rooms';
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
];
