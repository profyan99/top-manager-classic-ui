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
        addNotification(text, 'error');
      },
      info: (text) => {
        addNotification(text, 'info');
      },
      game: (text) => {
        addNotification(text, 'game');
      },
    };
  },
};

export default notificationPlugin;
