import store from '~/store';

let timer = null;

export const stopSchedule = () => {
  if (timer) {
    clearInterval(timer);
  }
  timer = null;
};

export const startSchedule = async (startTime) => {
  stopSchedule();

  await store.dispatch('game/setTime', (Date.now() - startTime) / 1000);
  timer = setInterval(() => store.dispatch('game/updateTime'), 1000);
};
