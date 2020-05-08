const getters = {
  roomList: ({ rooms, roomsIds }) => roomsIds.map((id) => rooms[id]),
  roomsMeta: ({ meta }) => meta,
};

export default getters;
