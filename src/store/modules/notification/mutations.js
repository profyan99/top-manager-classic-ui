const mutations = {
  addNotification(state, data) {
    state.notifications.push({
      id: state.lastNotificationId++,
      ...data,
    });
  },
  removeNotification(state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id,
    );
  },
  removeAllNotifications(state) {
    state.notifications = [];
    state.lastNotificationId = 0;
  },
};

export default mutations;
