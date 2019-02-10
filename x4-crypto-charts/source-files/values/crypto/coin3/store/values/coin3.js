export default ({ options }) => ({

  name: 'values/coin3',


  state: options.values.coin3,


  mutations: {

    COIN3_CHANGE(state, { coin3 }) {
      state.values.coin3 = coin3
    },

  },

})
