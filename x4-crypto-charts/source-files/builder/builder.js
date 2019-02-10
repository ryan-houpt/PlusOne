import '~/common/bootstrap/polyfills'


let x4wp = window.x4wp
let globName = 'X4WP.GLOB_NAME'
let x4builder = x4wp.builders[globName]
let x4plugin = window[globName]

x4builder.schema = X4WP.BUILDER


x4builder.create = function({ slug, parent }) {
  let Vue = window.Vue

  let { store } = x4plugin.widgets[slug]
  x4builder.widgets = x4builder.widgets || {}

  x4builder.widgets[slug] = x4wp.builders.current = {
    globName,
    store,
  }

  let element = document.createElement('div')
  parent = parent || document.body
  parent.appendChild(element)

  let App = require('./components/AppBuilder').default

  let app = x4builder.widgets[slug].app = new Vue({
    store,
    el: element,
    render: h => h(App),
    data() {
      return {
        theme: 'material',
        subtheme: 'filled',
      }
    },
    computed: {
      colors() {
        return store.state.builder.colors
      },
    },
  })
}
