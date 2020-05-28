import Nes from '@hapi/nes/lib/client';
import axios from 'axios';

import store from './store';

let client = null;

function websocketHandler(message, _flags) {
  const { objectType, eventType, body } = message;
  switch (objectType) {
  case 'ERROR': {
    console.log('Error in Games in ws: ', body);
    break;
  }
  case 'GAME_PREVIEW': {
    switch (eventType) {
    case 'ADD': {
      store.dispatch('gameList/addGame', body);
      break;
    }
    case 'UPDATE': {
      store.dispatch('gameList/updateGame', body);
      break;
    }
    case 'REMOVE': {
      store.dispatch('gameList/removeGame', body);
      break;
    }
    default:
      break;
    }
    break;
  }
  case 'GAME_PREVIEW_META': {
    switch (eventType) {
    case 'UPDATE': {
      store.dispatch('gameList/updateMeta', body);
      break;
    }
    default:
      break;
    }
    break;
  }
  case 'GAME': {
    switch (eventType) {
    case 'UPDATE': {
      store.dispatch('game/updateGameData', body);
      break;
    }
    case 'REMOVE': {
      // TODO
      break;
    }
    case 'END': {
      store.dispatch('game/finishGame', body);
      break;
    }
    case 'RESTART': {
      store.dispatch('game/setNewGame', body);
      break;
    }
    default:
      break;
    }
    break;
  }
  case 'MESSAGE': {
    store.dispatch('chat/addMessage', body);
    break;
  }
  case 'PLAYER': {
    switch (eventType) {
    case 'CONNECT': {
      store.dispatch('game/connectPlayer', body);
      break;
    }
    case 'RECONNECT': {
      store.dispatch('game/reconnectPlayer', body);
      break;
    }
    case 'DISCONNECT': {
      if (body.force) {
        store.dispatch('game/disconnectPlayer', body);
      }
      // TODO
      break;
    }
    case 'UPDATE': {
      store.dispatch('game/updatePlayer', body);
      break;
    }
    case 'RESTART_REJECT': {
      store.dispatch('game/playerRejectsRestart', body);
      break;
    }
    default:
      break;
    }
    break;
  }
  case 'COMPANY': {
    switch (eventType) {
    case 'UPDATE': {
      store.dispatch('game/updateCompany', body);
      break;
    }
    default:
      break;
    }
    break;
  }
  default:
    break;
  }
}

export async function connect() {
  if (client) {
    return Promise.resolve();
  }
  client = new Nes.Client(`ws://${window.location.host}/wsapp/`);
  await axios.get('/nes/auth', { withCredentials: true });
  return client.connect({ reconnect: true });
}

export function disconnectGame(gameId) {
  if (!client) {
    return;
  }
  client.unsubscribe(`/games/${gameId}`, null);
}

export function unsubscribeGameList() {
  if (!client) {
    return;
  }
  client.unsubscribe('/games', null);
}

export function subscribeGameList() {
  return connect().then(() => client.subscribe('/games', websocketHandler));
}

export function connectGame(gameId) {
  return connect().then(() =>
    client.subscribe(`/games/${gameId}`, websocketHandler),
  );
}
