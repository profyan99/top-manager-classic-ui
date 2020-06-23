export default {
  gameData: null,
  players: {},
  playersList: [],
  currentPlayer: {
    id: -1,
    state: '',
    userName: '',
    companyName: '',
    company: {},
    solutions: {
      price: 0,
      production: 0,
      marketing: 0,
      investments: 0,
      nir: 0,
    },
  },
  currentSolutions: {
    price: 0,
    production: 0,
    marketing: 0,
    investments: 0,
    nir: 0,
  },
  currentSecond: 0,
  newGame: {
    id: 0,
  },
};
