export default ({ options }) => ({

  name: 'values/fiat',


  state: options.values.fiat,


  mutations: {

    FIAT_CHANGE(state, { fiat }) {
      state.values.fiat = fiat
    },

  },

})
