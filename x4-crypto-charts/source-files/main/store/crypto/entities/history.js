let Vue = window.Vue


export default () => ({

  name: 'entities/history',


  state: {},


  mutations: {

    HISTORY_INIT(state, { id, history, period }) {
      if (!state.entities.history[id]) {
        Vue.set(state.entities.history, id, {})
      }

      Vue.set(state.entities.history[id], period, history)
    },

  },


  actions: {

    ensure({ state, dispatch }, { id, period }) {
      if (!state.entities.history[id] || !state.entities.history[id][period]) {
        return dispatch('entities/history/retrieve', { id, period })
      }
    },

    retrieve({ state, commit, dispatch }, { id, interval, period, cache }) {
      if (!id) {
        return
      }

      let end = new Date().getTime()
      let start = end - period

      return new Promise((resolve, reject) => {
        dispatch('coincap/history/retrieve', { id, interval, start, end, cache })
          .then(({ history }) => {
            commit('HISTORY_INIT', { id, history, period })
            resolve({ history })
          })
          .catch(reject)
      })
    },

  },

})
