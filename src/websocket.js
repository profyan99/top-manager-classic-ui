import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import store from './store';

let stompClient = null;
let subscribedRoom = null;
let subscribedRoomList = null;


function websocketHandler(message) {
  const { objectType, eventType, body } = JSON.parse(message.body);
  switch (objectType) {
    case 'ERROR': {
      console.log('Error in Rooms in ws: ', body);
      // TODO notify
      break;
    }
    case 'ROOM_PREVIEW': {
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
      }
      break;
    }
    case 'GAME': {
      switch (eventType) {
        case 'ADD': {
          store.dispatch('game/setGameDataWebsocket', body);
          break;
        }
        case 'UPDATE': {
          store.dispatch('game/updateGameDataWebsocket', body);
          break;
        }
        case 'TICK': {
          store.dispatch('game/updateGameTickWebsocket', body);
          break;
        }
      }
      break;
    }
    case 'MESSAGE': {
      store.dispatch('chat/addMessageWebsocket', body);
      break;
    }
    case 'PLAYER': {
      switch (eventType) {
        case 'CONNECT': {
          store.dispatch('game/addPlayer', body);
          break;
        }
        case 'DISCONNECT': {
          if (body.force) {
            store.dispatch('game/removePlayer', body);
          }
          // TODO
          break;
        }
        case 'UPDATE': {
          store.dispatch('game/updatePlayer', body);
          break;
        }
      }
      break;
    }
  }
}


async function socketConnect() {
  /* const decodedToken = jwt.decode(store.state.user.accessToken, { complete: true });
  if (decodedToken.payload.exp < new Date().getTime() / 1000) {
    await store.dispatch('refreshToken');
  } */
  if (stompClient) {
    return Promise.resolve();
  }

  const socket = new SockJS(`http://localhost:9000/room?access_token=${ store.state.user.accessToken }`);
  stompClient = Stomp.over(socket);
  return new Promise((resolve, reject) => {
    stompClient.connect({}, (frame) => {
      console.log('Socket connected', frame);
      stompClient.subscribe('/user/queue/errors', websocketHandler);
      resolve();
    }, (error) => {
      console.log(error);
      stompClient = null;
      subscribedRoom = null;
      subscribedRoomList = null;
      reject(error);
    });
  });
}


export function disconnectRoom() {
  if (subscribedRoom) {
    subscribedRoom.unsubscribe();
    subscribedRoom = null;
  }
}

export function unsubscribeRoomList() {
  if (subscribedRoomList) {
    subscribedRoomList.unsubscribe();
    subscribedRoomList = null;
  }
}

function sendMessage(destination, message) {
  stompClient.send(destination, JSON.stringify(message), {});
}

export function subscribeRoomList() {
  return socketConnect()
    .then(() => {
      if (subscribedRoomList) {
        return;
      }

      subscribedRoomList = stompClient
        .subscribe('/topic/room/list', websocketHandler);
    });
}

export function connectRoom(roomId) {
  return socketConnect()
    .then(() => {
      if (subscribedRoom) {
        disconnectRoom();
      }

      subscribedRoom = stompClient
        .subscribe(`/topic/room/event/${ roomId }`, websocketHandler);
      sendMessage(`/topic/room/${ roomId }/connect`, {});
    });
}
