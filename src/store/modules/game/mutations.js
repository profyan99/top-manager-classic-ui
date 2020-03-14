const mutations = {
  setGameData(state, data) {
    state.gameData = data;
  },
  updateGameData(state, data) {
    state.gameData = {
      ...data,
    };
  },
  updateGameTick(state, { amount }) {
    state.currentSecond = amount;
  },
  updateSolutionsPrice(state, price) {
    state.currentSolutions.price = price;
  },
  updateSolutionsProduction(state, production) {
    state.currentSolutions.production = production;
  },
  updateSolutionsMarketing(state, marketing) {
    state.currentSolutions.marketing = marketing;
  },
  updateSolutionsInvestments(state, investments) {
    state.currentSolutions.investments = investments;
  },
  updateSolutionsNir(state, nir) {
    state.currentSolutions.nir = nir;
  },
  updateCompany(state, company) {
    state.company = company;
  },
};

export default mutations;
