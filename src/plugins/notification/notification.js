import store from '../../store';

const notificationPlugin = {
  install: (vue) => {
    const addNotification = (text, type) => {
      store.dispatch('notification/addNotification', {
        text,
        type,
      });
    };

    vue.prototype.$notification = {
      error: (text) => {
        addNotification(text, 'ERROR');
      },
      info: (text) => {
        addNotification(text, 'INFO');
      },
      game: (text) => {
        addNotification(text, 'GAME');
      },
    };
  },
};

export default notificationPlugin;
