export default ({ options }) => ({

  name: 'values/coin4',


  state: options.values.coin4,


  mutations: {

    COIN4_CHANGE(state, { coin4 }) {
      state.values.coin4 = coin4
    },

  },

})
