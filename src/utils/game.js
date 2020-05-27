export const GameState = {
  PREPARE: 'PREPARE',
  PLAY: 'PLAY',
  END: 'END',
};

export function convertGameState(gameState, playerState) {
  switch (gameState) {
  case 'PREPARE':
    return 'Ожидание';
  case 'PLAY':
    if (playerState === 'WAIT') {
      return 'Ожидание игроков';
    }
    return 'Принятие решений';
  case 'END':
    return 'Игра закончилась';
  default:
    return 'Неизвестно';
  }
}

export function convertSecondsToMinutes(seconds) {
  return `${Math.floor(seconds / 60)}:${`0${Math.floor(seconds % 60)}`.slice(
    -2,
  )}`;
}

export default {
  GameState,
  convertGameState,
  convertSecondsToMinutes,
};
