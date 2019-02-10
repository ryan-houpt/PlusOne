export default () => ({

  name: 'builder/instructions',


  state: {
    visible: false,
    init: null,
  },


  mutations: {

    BUILDER_INSTRUCTIONS_SHOW(state, { init }) {
      state.builder.instructions.init = init
      state.builder.instructions.visible = true
    },

    BUILDER_INSTRUCTIONS_HIDE(state) {
      state.builder.instructions.visible = false
    },

  },


  actions: {

    show({ commit }, { init }) {
      commit('BUILDER_INSTRUCTIONS_SHOW', { init })
    },

    hide({ commit }) {
      commit('BUILDER_INSTRUCTIONS_HIDE')
    },

  },

})
