let x4plugin = window['X4WP.GLOB_NAME']


export default ({ options }) => ({

  name: 'defaults/period',


  state: options.values.period,


  mutations: {

    PERIOD_CHANGE(state, { id, period }) {
      if (id === undefined && x4plugin.multiValues[state.type].period) {
        state.defaults.period = period
      }
    },

  },

})
