let script = document.querySelector('script[data-entry="X4WP.PLUGIN"]')


export default () => ({

  name: 'builder/position',


  state: script.dataset.vcRight !== undefined
    ? 'right'
    : 'left',


  mutations: {

    BUILDER_POSITION_CHANGE(state, { position }) {
      state.builder.position = position
    },

  },


  actions: {

    change({ state, commit }) {
      let position = state.builder.position === 'left'
        ? 'right'
        : 'left'

      commit('BUILDER_POSITION_CHANGE', { position })
    },

  },

})
