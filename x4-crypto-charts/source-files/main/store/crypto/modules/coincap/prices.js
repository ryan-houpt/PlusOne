let x4wp = window.x4wp


export default () => ({

  name: 'coincap/prices',


  actions: {

    connect({ state, dispatch }, { assets, callback }) {
      if (!x4wp.requests.wsCoincapPrices) {
        x4wp.requests.wsCoincapPrices = {
          query: [],
          assets: {},
          callbacks: {},
          socket: null,
          lastTime: 0,
        }
      }

      let ws = x4wp.requests.wsCoincapPrices

      if (assets) {
        ws.assets[state.slug] = assets
      }

      if (callback) {
        ws.callbacks[state.slug] = callback
      }

      let query2 = []
      let needUpdate = false

      for (let slug in ws.assets) {
        ws.assets[slug].forEach(item => {
          if (query2.indexOf(item) === -1) {
            query2.push(item)
          }
        })
      }

      for (let i = 0; i < query2.length; i++) {
        if (ws.query.indexOf(query2[i]) === -1) {
          needUpdate = true
          break
        }
      }

      if (ws.socket && !needUpdate) {
        return
      }

      if (new Date().getTime() - ws.lastTime < 2000) {
        return setTimeout(() => dispatch('coincap/prices/connect', { log: false }), 500)
      }
      
      ws.query = query2
      ws.lastTime = new Date().getTime()

      if (ws.socket) {
        ws.socket.close()
      }

      ws.socket = new WebSocket('wss://ws.coincap.io/prices?assets=' + ws.query.join(','))

      ws.socket.onclose = event => {
        if (!event.wasClean) {
          ws.socket = null
          setTimeout(() => dispatch('coincap/prices/connect'), 5000)
        }
      }

      ws.socket.onmessage = event => {
        let resp = null

        try {
          resp = JSON.parse(event.data)
        }
        catch (err) {
          resp = {}
        }

        for (let id in resp) {
          resp[id] = parseFloat(resp[id])
        }

        for (let selector in ws.callbacks) {
          ws.callbacks[selector]({ resp })
        }
      }
    },

  },

})
