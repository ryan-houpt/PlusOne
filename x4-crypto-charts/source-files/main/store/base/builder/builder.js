import wait from '~/common/bootstrap/wait'

let x4wp = window.x4wp
let globName = 'X4WP.GLOB_NAME'
let x4plugin = window[globName]
let x4builder = x4wp.builders[globName]

let script = document.querySelector('script[data-entry="X4WP.PLUGIN"]')


export default () => ({

  name: 'builder',


  state: {
    enabled: script.dataset.vcEnabled !== undefined,
    opened: false,
  },


  mutations: {

    BUILDER_ENABLED_CHANGE(state, { enabled }) {
      state.builder.enabled = enabled
    },

    BUILDER_OPENED_CHANGE(state, { opened }) {
      state.builder.opened = opened
    },

    BUILDER_OPTION_CHANGE(state, { path, value }) {
      arguments[1].log = false

      let Vue = window.Vue

      let sections = path.split('.')
      let option = sections.pop()

      sections.forEach(name => {
        if (state[name] === undefined) {
          Vue.set(state, name, {})
        }

        state = state[name]
      })

      if (value !== undefined) {
        Vue.set(state, option, value)
      } else {
        Vue.delete(state, option)
      }
    },

  },


  actions: {

    open({ dispatch }, { parent }) {
      wait(
        () => {
          return !!x4builder.create
        },
        () => {
          if (x4wp.builders.current) {
            return dispatch('builder/close').then(() => {
              dispatch('builder/open/next', { parent })
            })
          }

          dispatch('builder/open/next', { parent })
        },
      )
    },


    'open/next'({ state, commit }, { parent }) {
      commit('BUILDER_OPENED_CHANGE', { opened: true })
      x4builder.create({ parent, slug: state.slug })
    },


    close() {
      let { app, store, globName } = x4wp.builders.current

      store.commit('BUILDER_OPENED_CHANGE', { opened: false })

      return new Promise(resolve => {
        setTimeout(() => {
          app.$destroy()

          if (app.$el.parentNode) {
            app.$el.parentNode.removeChild(app.$el)
          }

          x4wp.builders.current = null
          delete x4wp.builders[globName].widgets[store.state.slug]

          resolve()
        }, 150)
      })
    },


    'option/change'({ getters, commit, dispatch }, { path, value }) {
      if (typeof path === 'string') {
        if (path.substr(0, 1) === '.') {
          path = path.substr(1)
        }

        commit('BUILDER_OPTION_CHANGE', { path, value })
      } else {
        let payload = {}

        payload[path.var] = value

        if (path.mutation) {
          commit(path.mutation, payload)
        }

        if (path.action) {
          dispatch(path.action, payload)
        }
      }
    },

  },

})
