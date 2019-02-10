let script = document.querySelector('script[data-entry="X4WP.PLUGIN"]')

let colors = {
  dark: {
    dark: true,
    primary: 'rgba(255,255,255,1)',
    inverted: 'rgba(0,0,0,1)',
    accent: 'rgba(255,255,255,1)',
  },
  light: {
    dark: false,
    primary: 'rgba(0,0,0,1)',
    inverted: 'rgba(255,255,255,1)',
    accent: 'rgba(0,188,212,1)',
  },
}


export default () => ({

  name: 'builder/colors',


  state: Object.assign({}, script.dataset.vcInvert !== undefined
    ? colors.light
    : colors.dark),


  mutations: {

    BUILDER_COLORS_CHANGE(state, { colors }) {
      state.builder.colors = colors
    },

  },


  actions: {

    invert({ state, commit }) {
      let newColors = Object.assign({}, state.builder.colors.dark
        ? colors.light
        : colors.dark)

      commit('BUILDER_COLORS_CHANGE', { colors: newColors })
    },

  },

})
