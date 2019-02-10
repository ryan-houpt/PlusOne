export default () => ({

  name: 'entities/fiats',


  state: {
    'united-states-dollar': {
      id: 'united-states-dollar', short: 'USD', type: 'fiat', price: 1, symbol: '$', name: 'United States Dollar',
    },
  },


  mutations: {

    FIATS_INIT(state, { fiats }) {
      state.entities.fiats = fiats
    },

  },


  getters: {

    all(state, getters) {
      return getters['helpers/items/get']({
        hash: state.entities.fiats,
        sort: 'short:asc',
      })
    },

  },


  actions: {

    retrieve({ commit, dispatch }, { cache }) {
      return dispatch('coincap/rates/retrieve', { cache })
        .then(({ fiats }) => {
          commit('FIATS_INIT', { fiats })
        })
        .catch(err => {
          
        })
    },

  },


})
