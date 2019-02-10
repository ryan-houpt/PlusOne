let x4wp = window.x4wp


export default () => ({

  name: 'helpers/request',


  actions: {

    _name(context, { url, method, contentType, headers, body, name, cache }) {
      return new Promise((resolve, reject) => {
        method = method
          ? method.toUpperCase()
          : 'GET'

        contentType = contentType
          ? contentType
          : 'json'

        headers = headers || {}
        body = body || {}

        name = name || Math.random().toString(36).substr(2, 8)

        cache = cache !== undefined
          ? cache
          : method === 'GET'
            ? true
            : false

        let callback = () => {
          let xmlHttp = x4wp.requests[name].xmlHttp

          if (!x4wp.requests[name].parsed) {
            try { xmlHttp.responseParsed = JSON.parse(xmlHttp.responseText) } catch (err) {}
            x4wp.requests[name].parsed = true
          }

          if (xmlHttp.status === 200) {
            resolve(xmlHttp.responseParsed)
          } else {
            reject(xmlHttp)
          }
        }

        if (!cache || !x4wp.requests[name] || (cache === parseInt(cache, 10) && new Date().getTime() - x4wp.requests[name].lastTime > cache)) {
          let xmlHttp = new XMLHttpRequest()

          x4wp.requests[name] = {
            xmlHttp,
            callbacks: [callback],
            ready: false,
            parsed: false,
            lastTime: new Date().getTime(),
          }

          xmlHttp.open(method, url, true)

          for (let hname in headers) {
            xmlHttp.setRequestHeader(hname, headers[hname])
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
            if (contentType === 'urlencoded') {
              body = Object.keys(body).map(key => {
                return key + '=' + encodeURIComponent(body[key] instanceof Object
                  ? JSON.stringify(body[key])
                  : body[key])
              }).join('&')

              xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
              xmlHttp.send(body)
            }

            if (contentType === 'json') {
              xmlHttp.setRequestHeader('Content-Type', 'application/json')
              xmlHttp.send(JSON.stringify(body))
            }
          } else {
            xmlHttp.send()
          }
        } else {
          if (!x4wp.requests[name].ready) {
            x4wp.requests[name].callbacks.push(callback)
          } else {
            callback()
          }
        }
      })
    },

  },

})
