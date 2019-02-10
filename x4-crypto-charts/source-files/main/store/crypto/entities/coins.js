let Vue = window.Vue


export default () => ({

  name: 'entities/coins',


  state: {},


  mutations: {

    COINS_INIT(state, { coins }) {
      state.entities.coins = coins
    },

    COINS_ADD(state, { coins }) {
      for (let id in coins) {
        Vue.set(state.entities.coins, id, coins[id])
      }
    },

  },


  getters: {

    'change/field/add'(state) {
      return ({ coins }) => {
        for (let id in coins) {
          coins[id].change = state.entities.coins[id] && state.entities.coins[id].change !== undefined
            ? state.entities.coins[id].change
            : 0
        }
      }
    },

    all(state, getters) {
      return getters['helpers/items/get']({
        hash: state.entities.coins,
        sort: 'rank:asc',
      })
    },

  },


  actions: {

    retrieve({ state, getters, commit, dispatch }, { ids, cache }) {
      return new Promise((resolve, reject) => {
        dispatch('coincap/assets/retrieve', { ids, cache })
          .then(({ assets }) => {
            getters['entities/coins/change/field/add']({ coins: assets })

            if (!ids) {
              commit('COINS_INIT', { coins: assets })
            } else {
              commit('COINS_ADD', { coins: assets })
            }

            resolve({ assets })
          })
          .catch(reject)
      })
    },

  },

})
