let Vue = window.Vue
let x4plugin = window['X4WP.GLOB_NAME']


export default ({ options }) => ({

  name: 'values/period',


  state: !x4plugin.multiValues[options.type].period
    ? options.values.period
    : {},


  mutations: {

    PERIOD_CHANGE(state, { id, period }) {
      if (x4plugin.multiValues[state.type].period) {
        if (id !== undefined) {
          Vue.set(state.values.period, id, period)
        }
      } else {
        state.values.period = period
      }
    },

  },


  getters: {

    _name(state) {
      return ({ id }) => x4plugin.multiValues[state.type].period
        ? state.values.period[id] || state.defaults.period
        : state.values.period
    },

  },

})
