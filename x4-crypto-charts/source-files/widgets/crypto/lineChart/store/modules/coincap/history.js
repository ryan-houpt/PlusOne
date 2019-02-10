let x4wp = window.x4wp


export default () => ({

  name: 'coincap/history',


  getters: {

    format() {
      return ({ point }) => ({
        price: parseFloat(point.priceUsd) || 0,
        time: new Date(point.time),
      })
    },

  },


  actions: {

    retrieve({ getters, dispatch }, { id, interval, start, end, cache, log }) {
      return new Promise((resolve, reject) => {
        if (!interval) {
          let period = end - start

          if (period <= 86400000) { // 1 day
            interval = 'm5'
          } else if (period > 86400000 && period <= 604800000) { // 7 days
            interval = 'm30'
          } else if (period > 604800000 && period <= 2592000000) { // 30 days
            interval = 'h2'
          } else if (period > 2592000000 && period <= 7776000000) { // 90 days
            interval = 'h6'
          } else if (period > 7776000000 && period <= 15552000000) { // 180 days
            interval = 'h12'
          } else if (period > 15552000000) { // 365 days
            interval = 'd1'
          }
        }

        let name = 'coincapHistory_' + id + '_' + interval + '_' + (start || '0') + '_' + (end || '0')

        let url = 'https://api.coincap.io/v2/assets/' + id + '/history?interval=' + interval
          + (start ? '&start=' + start : '')
          + (end ? '&end=' + end : '')

        dispatch('helpers/request', { type: 'GET', url, log, cache, name })
          .then(resp => {
            if (!resp || !resp.data) {
              return reject()
            }

            let history = resp.data.map(point => {
              return getters['coincap/history/format']({ point })
            })

            resolve({ history })
          })
          .catch(xmlHttp => {
            reject()
          })
      })
    },

  },

})
