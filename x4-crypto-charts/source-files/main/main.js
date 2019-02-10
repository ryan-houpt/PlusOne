import '~/common/bootstrap/polyfills'
import wait from '~/common/bootstrap/wait'


let x4wp = window.x4wp
let x4plugin = window['X4WP.GLOB_NAME']
let x4builder = x4wp.builders['X4WP.GLOB_NAME']

x4wp.wait = x4wp.wait || wait
x4plugin.defaults = X4WP.DEFAULTS
x4plugin.multiValues = X4WP.MULTI_VALUES
x4plugin.hiddenValues = X4WP.HIDDEN_VALUES


wait(
  () => {
    return !!window.Promise && !!window.Vue && !!window.Vuex
  },
  () => {
    let push = x4plugin.push

    x4plugin.push = function() {
      push.apply(this, arguments)
      render.apply(this, arguments)
    }

    x4plugin.forEach(render)
  },
)


export function buildStore({ slug, options }) {
  let Vue = window.Vue

  let mixedOptions = calcOptions(options)
  let getStore = require('./store').default

  return getStore(mixedOptions.type, { slug, options: mixedOptions })
}


function render(init) {
  let Vue = window.Vue

  if (!init) {
    return
  }

  let selector = init.selector + ':not(.x4-rendered)'
  let element = document.querySelector(selector)

  if (!element) {
    return
  }

  element.classList.add('x4-rendered')

  let attributes = {}

  for (let i = 0; i < element.attributes.length; i++) {
    attributes[element.attributes[i].name] = element.attributes[i].value
  }
  
  let slug = Math.random().toString(36).substr(2, 8)
  let options = calcOptions(init)

  x4plugin.widgets = x4plugin.widgets || {}

  x4plugin.widgets[slug] = {
    init,
    options,
  }

  let getStore = require('./store').default
  let store = x4plugin.widgets[slug].store = getStore(options.type, { slug, options })

  store.dispatch('bootstrap')

  let App = require('./components/base/AppMain').default

  let app = x4plugin.widgets[slug].app = new Vue({
    store,
    el: element,
    render: h => h(App),
    data() {
      return {
        attributes,
      }
    },
  })

  return slug
}


function calcOptions(init) {
  let type = init.type || 'X4WP.DEF_WIDGET'
  let defaults = x4plugin.defaults[type]

  let options = calcOptionsRecursive({}, init, defaults, init, defaults)
  options = calcOptionsRecursive(options, defaults, init, init, defaults)

  delete options.changes

  applyChanges(init, options, defaults)

  return options
}


function calcOptionsRecursive(options, src1, src2, primary, slave) {
  for (let key in src1) {
    if (Array.isArray(src1[key])) {
      options[key] = primary[key] !== undefined ? primary[key] : slave[key]
      options[key] = JSON.parse(JSON.stringify(options[key]))
    } else if (src1[key] instanceof Object) {
      if (Object.keys(src1[key]).length > 0) {
        options[key] = calcOptionsRecursive(options[key] || {}, src1[key] || {}, src2[key] || {}, primary[key] || {}, slave[key] || {})
      }
    } else {
      options[key] = primary[key] !== undefined ? primary[key] : slave[key]
    }
  }

  return options
}


function applyChanges(init, options, defaults) {
  if (defaults.changes && defaults.changes[options.theme] && defaults.changes[options.theme][options.subtheme]) {
    let changes = defaults.changes[options.theme][options.subtheme]

    for (let key in changes) {
      changes[key].forEach(change => {
        let initValue = init

        change.path.split('.').forEach(name => {
          initValue = initValue !== undefined && initValue[name] !== undefined
            ? initValue[name]
            : undefined
          
        })

        if (initValue === undefined) {
          let sections = change.path.split('.')
          let option = sections.pop()
          let result = options

          sections.forEach(name => result = result[name])
          result[option] = change.value
        }
      })
    }
  }
}
