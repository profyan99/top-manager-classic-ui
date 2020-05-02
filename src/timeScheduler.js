import store from '~/store';

let timer = null;

export const stopSchedule = async () => {
  if (timer) {
    clearInterval(timer);
  }
  await store.dispatch('game/setTime', 0);
  timer = null;
};

export const startSchedule = async (startTime) => {
  await stopSchedule();

  await store.dispatch('game/setTime', (Date.now() - startTime) / 1000);
  timer = setInterval(() => store.dispatch('game/updateTime'), 1000);
};
