export default () => ({

  name: 'coincap/rates',


  getters: {

    format() {
      return ({ rate }) => ({
        id: rate.id,
        short: rate.symbol,
        type: rate.type || 'fiat',
        price: parseFloat(rate.rateUsd) || 1,
        symbol: rate.currencySymbol || '',
        name: rate.name || '',
      })
    },

  },


  actions: {

    retrieve({ getters, dispatch }, { cache, log }) {
      return new Promise((resolve, reject) => {
        let options = Object.assign({}, X4WP.VENDORS.requests.coincapRates, {
          log,
          cache,
          name: 'coincapRates',
        })

        dispatch('helpers/request', options)
          .then(resp => {
            let fiats = {}

            if (!resp || !resp.data) {
              return reject()
            }

            resp.data.forEach(data => {
              fiats[data.id] = getters['coincap/rates/format']({ rate: data })
            })

            resolve({ fiats })
          })
          .catch(xmlHttp => {
            reject()
          })
      })
    },

  },

})
