export function convertRoomState(roomState) {
  switch (roomState) {
  case 'PREPARE':
    return 'Ожидание игроков';
  case 'PLAY':
    return 'Идет игра';
  case 'END':
    return 'Игра закончилась';
  default:
    return 'Неизвестно';
  }
}

export function convertSecondsToMinutes(seconds) {
  return `${Math.floor(seconds / 60)}:${(`0${Math.floor(seconds % 60)}`).slice(-2)}`;
}
