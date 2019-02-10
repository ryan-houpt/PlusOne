let intervals = {
  fiats: null,
  coins: null,
}


export default () => ({

  name: 'bootstrap',


  state: {
    isLoaded: false,
  },


  mutations: {

    LOADED_CHANGE(state, { isLoaded }) {
      state.bootstrap.isLoaded = isLoaded
    },

  },


  actions: {

    _name({ state, getters, commit, dispatch }) {
      let ids = [1, 2, 3, 4].map(index => state.values['coin' + index]).filter(id => !!id)

      let promises = [
        dispatch('entities/fiats/retrieve'),
        dispatch('entities/coins/retrieve', { ids }),
      ]

      for (let index = 1; index <= 4; index++) {
        if (state.values['coin' + index]) {
          let id = state.values['coin' + index]
          let period = state.values.period

          promises.concat(
            dispatch('entities/history/retrieve', { id, period })
          )
        }
      }

      Promise.all(promises).then(() => {
        commit('LOADED_CHANGE', { isLoaded: true })
      })

      if (state.builder.enabled) {
        dispatch('entities/coins/retrieve')
      }

      intervals.fiats = setInterval(() => {
        dispatch('entities/fiats/retrieve', { cache: 5 * 60 * 1000 })
      }, 5 * 60 * 1000 + 5000)

      intervals.coins = setInterval(() => {
        for (let index = 1; index <= 4; index++) {
          if (state.values['coin' + index]) {
            let id = state.values['coin' + index]
            let period = state.values.period

            dispatch('entities/history/retrieve', { id, period }, { cache: 5 * 60 * 1000 })
          }
        }
      }, 5 * 60 * 1000 + 5000)
    },


    reset() {
      clearInterval(intervals.fiats)
      clearInterval(intervals.coins)
    },

  },

})
