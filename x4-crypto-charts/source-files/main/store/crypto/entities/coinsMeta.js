export default () => ({

  name: 'entities/coinsMeta',


  state: {},


  mutations: {

    COINS_META_INIT(state, { coinsMeta }) {
      state.entities.coinsMeta = coinsMeta
    },

  },


  actions: {

    retrieve({ state, getters, commit, dispatch }, { cache }) {
      return new Promise((resolve, reject) => {
        dispatch('coincap/assetsMeta/retrieve', { cache })
          .then(({ assetsMeta }) => {
            commit('COINS_META_INIT', { coinsMeta: assetsMeta })
            resolve({ coinsMeta: assetsMeta })
          })
          .catch(reject)
      })
    },

  },

})
