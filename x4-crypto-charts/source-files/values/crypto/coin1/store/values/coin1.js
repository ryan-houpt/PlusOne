export default ({ options }) => ({

  name: 'values/coin1',


  state: options.values.coin1,


  mutations: {

    COIN1_CHANGE(state, { coin1 }) {
      state.values.coin1 = coin1
    },

  },

})
