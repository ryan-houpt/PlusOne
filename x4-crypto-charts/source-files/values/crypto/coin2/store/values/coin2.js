export default ({ options }) => ({

  name: 'values/coin2',


  state: options.values.coin2,


  mutations: {

    COIN2_CHANGE(state, { coin2 }) {
      state.values.coin2 = coin2
    },

  },

})
