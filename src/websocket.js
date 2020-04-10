import Nes from '@hapi/nes/lib/client';
import axios from 'axios';

import store from './store';

let client = null;

function websocketHandler(message, _flags) {
  const { objectType, eventType, body } = message;
  switch (objectType) {
  case 'ERROR': {
    console.log('Error in Rooms in ws: ', body);
    // TODO notify
    break;
  }
  case 'GAME_PREVIEW': {
    switch (eventType) {
    case 'ADD': {
      store.dispatch('rooms/addRoomWebsocket', body);
      break;
    }
    case 'UPDATE': {
      store.dispatch('rooms/updateRoomWebsocket', body);
      break;
    }
    case 'REMOVE': {
      store.dispatch('rooms/removeRoomWebsocket', body);
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

export function disconnectRoom(roomId) {
  if (!client) {
    return;
  }
  client.unsubscribe(`/games/${roomId}`, null);
}

export function unsubscribeRoomList() {
  if (!client) {
    return;
  }
  client.unsubscribe('/games', null);
}

export function subscribeRoomList() {
  return connect()
    .then(() => client.subscribe('/games', websocketHandler));
}

export function connectRoom(roomId) {
  return connect()
    .then(() => client.subscribe(`/games/${roomId}`, websocketHandler));
}
