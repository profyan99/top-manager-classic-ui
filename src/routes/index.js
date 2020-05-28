import GameList from '~/pages/gameList';
import Game from '~/pages/game';
import Support from '~/pages/support';
import Feedback from '~/pages/feedback';
import Rules from '~/pages/rules';

export default [
  {
    label: 'Игры',
    path: '/',
    component: GameList,
    name: 'games',
    props: (route) => ({ gamePreviewId: route.query.gamePreviewId }),
  },
  {
    label: 'Правила',
    path: '/rules',
    component: Rules,
    name: 'rules',
  },
  {
    label: 'Поддержка',
    path: '/support',
    component: Support,
    name: 'support',
  },
  {
    label: 'Оставить отзыв',
    path: '/feedback',
    component: Feedback,
    name: 'feedback',
  },
  {
    name: 'game',
    path: '/game/:gameId',
    component: Game,
  },
];
