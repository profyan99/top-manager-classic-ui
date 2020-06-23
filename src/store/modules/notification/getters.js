const getters = {
  appNotifications: ({ notifications }) =>
    notifications.filter((notification) => notification.type !== 'GAME'),
  gameNotifications: ({ notifications }) =>
    notifications.filter((notification) => notification.type === 'GAME'),
};

export default getters;
