(function() {


let userAgent = window.navigator.userAgent

window.isEdge = userAgent.indexOf('Edge/') !== -1
window.isIE11 = userAgent.indexOf('Trident/') !== -1
window.isIE = userAgent.indexOf('MSIE ') !== -1 || window.isIE11
window.isFirefox = userAgent.indexOf('Firefox') !== -1


let globName = 'X4WP.GLOB_NAME'

let x4wp = window.x4wp = window.x4wp || {
  styles: {},
  scripts: {},
  requests: {},
  plugins: {},
  builders: {},
}


let script = document.querySelector('script[data-entry="X4WP.PLUGIN' + ('X4WP.ENTRY' !== 'loader' ? '/' + 'X4WP.ENTRY' : '') + '"]')

if (!script) {
  return
}


let x4plugin = window[globName] = window[globName] || []
x4wp.plugins[globName] = x4plugin

if (script.dataset.vcEnabled !== undefined) {
  x4wp.builders[globName] = x4wp.builders[globName] || {}
}

x4plugin.version = 'X4WP.VERSION'


let ignored = script.dataset.ignore
  ? script.dataset.ignore.split(',')
  : []

let required = {
  styles: X4WP.ENTRIES['X4WP.ENTRY'].styles,
  scripts: X4WP.ENTRIES['X4WP.ENTRY'].scripts,
  requests: X4WP.ENTRIES['X4WP.ENTRY'].requests,
}


let connect = {

  styles: [],
  scripts: [],
  requests: [],

  handlers: {

    styles(style) {
      let $style = document.createElement('link')
      $style.setAttribute('rel', 'stylesheet')

      if (style.name) {
        $style.setAttribute('data-name', style.name)
      }

      $style.setAttribute('href', style.value)
      document.head.appendChild($style)
    },

    scripts(script) {
      let $script = document.createElement('script')
      $script.setAttribute('type', 'text/javascript')

      if (script.name) {
        $script.setAttribute('data-name', script.name)
      }

      $script.setAttribute('src', script.value)
      $script.async = true

      document.head.appendChild($script)
    },

    requests(request) {
      let { url, method, headers, body } = request.value
      let name = request.name

      method = method
        ? method.toUpperCase()
        : 'GET'

      headers = headers || {}
      body = body || {}

      if (method === 'GET' || method === 'POST') {
        let xmlHttp = new XMLHttpRequest()

        x4wp.requests[name] = {
          xmlHttp,
          callbacks: [],
          ready: false,
          parsed: false,
          lastTime: new Date().getTime(),
        }

        xmlHttp.open(method, url, true)

        for (let aname in headers) {
          xmlHttp.setRequestHeader(aname, headers[aname])
        }

        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState === 4) {
            x4wp.requests[name].ready = true

            let callbacks = x4wp.requests[name].callbacks
            x4wp.requests[name].callbacks = []

            callbacks.forEach(callback => callback(xmlHttp))
          }
        }

        if (method === 'POST') {
          xmlHttp.setRequestHeader('Content-Type', 'application/json')
          xmlHttp.send(JSON.stringify(body))
        } else {
          xmlHttp.send()
        }
      }
/*
      if (method === 'WS') {
        let socket = new WebSocket(url)

        x4wp.requests[name] = {
          callbacks: [],
          socket,
        }

        socket.onmessage = event => {
          x4wp.requests[name].callbacks.forEach(callback => callback({ resp: event.data }))
        }
      }
*/
    },

  },

}


for (let atype in required) {
  if (!required[atype]) {
    continue
  }

  required[atype].forEach(item => {
    let mods, name, value = null

    if (Array.isArray(item)) {
      mods = item[0].split(':')
      name = mods.pop()
      value = item[1]
    } else {
      mods = item.split(':')
      value = mods.pop()
      name = ''

      if ('X4WP.INSTANCE' === 'js') {
        value = '/assets' + value
      }

      value = script.getAttribute('src').replace(/\/[^/?]+(\?.+)?$/, value + '$1')
    }

    if (ignored.indexOf(name) !== -1) {
      return
    }

    if (mods.indexOf('ie') !== -1 && !window.isIE) {
      return
    }

    if (mods.indexOf('b') !== -1 && script.dataset.vcEnabled === undefined) {
      return
    }

    if (name) {
      if (x4wp[atype][name]) {
        return
      }

      x4wp[atype][name] = value
    }

    let values = !Array.isArray(value)
      ? [value]
      : value

    values.forEach(value => {
      connect[atype].push({ mods, name, value })
    })
  })
}


for (let atype in required) {
  connect[atype].forEach(entity => {
    if (entity.mods.indexOf('dr') !== -1 && document.readyState !== 'interactive' && document.readyState !== 'complete') {
      document.addEventListener('DOMContentLoaded', () => {
        connect.handlers[atype](entity)
      })
    } else {
      connect.handlers[atype](entity)
    }
  })
}


})()


if ('X4WP.MODE' === 'development') {
  let interval = setInterval(() => {
    let Vue = window.Vue

    if (Vue) {
      Vue.config.devtools = false
      Vue.config.productionTip = false

      clearInterval(interval)
    }
  }, 1)
}
