export function convertRoomState(roomState, playerState) {
  switch (roomState) {
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
  return `${Math.floor(seconds / 60)}:${(`0${Math.floor(seconds % 60)}`).slice(-2)}`;
}
