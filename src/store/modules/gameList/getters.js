const getters = {
  gameList: ({ games, gamesIds }) => gamesIds.map((id) => games[id]),
  gamesMeta: ({ meta }) => meta,
};

export default getters;
