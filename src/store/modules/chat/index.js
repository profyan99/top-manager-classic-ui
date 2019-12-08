import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  messages: [
    {
      id: 0,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Suspendisse congue euismod sem id rutrum. Donec nec nunc id massa ' +
        'laoreet sollicitudin in ac nibh. Aliquam tristique, turpis et efficitur' +
        ' ultricies, nisi nulla ornare lectus, dapibus hendrerit nulla nisi ut ' +
        'tortor. Donec tellus nunc, semper sed enim vitae',
      date: new Date('1995-12-17T11:24:00'),
      user: {
        id: 0,
        userName: 'Kostya',
      },
    },
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet, consectetur',
      date: new Date('1995-12-17T11:44:00'),
      user: {
        id: 1,
        userName: 'Sergey Sh',
      },
    },
    {
      id: 2,
      content: 'Lorem ipsum dolor sit amet, consectetur',
      date: new Date('1995-12-17T11:54:00'),
      user: {
        id: 1,
        userName: 'Sergey Sh',
      },
    },
    {
      id: 3,
      content: ' In ultrices at mi vitae pretium. Nulla quis elit aliquet,' +
        ' aliquam elit a, feugiat ex. Maecenas elementum sed lorem ut luctus. ' +
        'Ut tellus justo',
      date: new Date('1995-12-17T11:58:00'),
      user: {
        id: 1,
        userName: 'Sergey Sh',
      },
    },
    {
      id: 4,
      content: 'Donec at nunc sollicitudin, dapibus nunc lacinia, scelerisque' +
        ' ligula. Ut sit amet ligula leo. Maecenas sit amet lobortis ipsum, ' +
        'nec rhoncus est. Nam cursus mi et dui suscipit pulvinar. ',
      date: new Date('1995-12-17T12:04:00'),
      user: {
        id: 1,
        userName: 'Sergey Sh',
      },
    },
    {
      id: 5,
      content: ' In ultrices at mi vitae pretium. Nulla quis elit aliquet,' +
        ' aliquam elit a, feugiat ex. Maecenas elementum sed lorem ut luctus. ' +
        'Ut tellus justo',
      date: new Date('1995-12-17T12:32:00'),
      user: {
        id: 1,
        userName: 'Sergey Sh',
      },
    },
    {
      id: 6,
      content: 'Donec at nunc sollicitudin, dapibus nunc lacinia, scelerisque' +
        ' ligula. Ut sit amet ligula leo. Maecenas sit amet lobortis ipsum, ' +
        'nec rhoncus est. Nam cursus mi et dui suscipit pulvinar. ',
      date: new Date('1995-12-17T12:54:00'),
      user: {
        id: 1,
        userName: 'Sergey Sh',
      },
    },
  ],
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
