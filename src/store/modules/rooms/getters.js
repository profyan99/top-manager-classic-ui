const getters = {
  roomList: ({ rooms, roomsIds }) => roomsIds.map((id) => rooms[id]),
};

export default getters;
