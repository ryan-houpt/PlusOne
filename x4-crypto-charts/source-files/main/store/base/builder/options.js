import { buildStore } from '~/common/src/assets/main'

let globName = 'X4WP.GLOB_NAME'
let x4plugin = window[globName]


export default () => ({

  name: 'builder',


  getters: {

    'calc/init'(state, getters) {
      return () => {
        let init = {}
        let defaults = x4plugin.defaults[state.type]

        if ('X4WP.INSTANCE' === 'wp') {
          init.id = x4plugin.widgets[state.slug].init.id
        }

        init.type = state.type
        init.selector = state.selector

        getters['builder/calc/init/recursive']({ init, options: state, defaults, keys: Object.keys(defaults) })

        delete init.changes

        return init
      }
    },


    'calc/init/recursive'(state, getters) {
      return ({ init, options, defaults, keys }) => {
        keys = keys || Object.keys(options)

        keys.forEach(key => {
          if (Array.isArray(options[key])) {
            if (JSON.stringify(options[key]) !== JSON.stringify(defaults[key] || [])) {
              init[key] = JSON.parse(JSON.stringify(options[key]))
            }
          } else if (options[key] instanceof Object) {
            init[key] = init[key] || {}

            getters['builder/calc/init/recursive']({ init: init[key], options: options[key] || {}, defaults: defaults[key] || {} })

            if (Object.keys(init[key]).length === 0) {
              delete init[key]
            }
          } else {
            if (options[key] !== defaults[key]) {
              init[key] = options[key]
            }
          }
        })
      }
    },

  },


  actions: {

    'reset/initial'({ state }) {
      let { app, init } = x4plugin.widgets[state.slug]
      let store = buildStore({ slug: state.slug, options: init })

      store.commit('BUILDER_ENABLED_CHANGE', { enabled: true })
      store.commit('BUILDER_OPENED_CHANGE', { opened: true })

      app.$store.dispatch('bootstrap/reset').then(() => {
        app.$store.replaceState(store.state)
        app.$store.dispatch('bootstrap')
      })
    },


    'reset/default'({ state }) {
      let { app, init } = x4plugin.widgets[state.slug]
      let type = init.type || x4plugin.defaults.type

      let options = Object.assign({}, init, x4plugin.defaults[type])
      let store = buildStore({ slug: state.slug, options })

      store.commit('BUILDER_ENABLED_CHANGE', { enabled: true })
      store.commit('BUILDER_OPENED_CHANGE', { opened: true })

      app.$store.dispatch('bootstrap/reset').then(() => {
        app.$store.replaceState(store.state)
        app.$store.dispatch('bootstrap')
      })
    },


    'reset/initial/option'({ state, dispatch }, { path }) {
      let { app, init } = x4plugin.widgets[state.slug]
      let store = buildStore({ slug: state.slug, options: init })
      let value = store.state

      let subpath = path instanceof Object
        ? path.value
        : path

      subpath.split('.').forEach(name => {
        value = value[name]
      })

      dispatch('builder/option/change', { path, value })
    },


    'reset/default/option'({ state, dispatch }, { path }) {
      let { app, init } = x4plugin.widgets[state.slug]
      let type = init.type || x4plugin.defaults.type

      let options = Object.assign({}, init, x4plugin.defaults[type])
      let store = buildStore({ slug: state.slug, options })
      let value = store.state

      let subpath = path instanceof Object
        ? path.value
        : path

      subpath.split('.').forEach(name => {
        value = value[name]
      })

      dispatch('builder/option/change', { path, value })
    },


    'options/save'({ dispatch }, { init }) {
      if ('X4WP.INSTANCE' === 'wp') {
        let options = {
          action: 'X4WP.GLOB_NAME/widget/options/update',
          body: {
            id: init.id,
            options: JSON.stringify(init),
          },
        }

        return dispatch('helpers/wprequest', options)
      }
    },

  },

})
