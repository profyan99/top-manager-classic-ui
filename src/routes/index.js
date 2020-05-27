import GameList from '~/pages/gameList';
import Game from '~/pages/game';

export default [
  {
    path: '/',
    component: GameList,
    name: 'games',
    props: (route) => ({ gamePreviewId: route.query.gamePreviewId }),
  },
  {
    name: 'game',
    path: '/game/:gameId',
    component: Game,
  },
];
