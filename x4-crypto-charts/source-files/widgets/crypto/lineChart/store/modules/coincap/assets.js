let x4wp = window.x4wp


export default () => ({

  name: 'coincap/assets',


  getters: {

    format() {
      return ({ asset }) => ({
        id: asset.id,
        short: asset.symbol,
        rank: parseInt(asset.rank),
        price: parseFloat(asset.priceUsd) || 0,
        mktcap: parseFloat(asset.marketCapUsd) || 0,
        change24h: parseFloat(asset.changePercent24Hr) || 0,
        vwap: parseFloat(asset.vwapUsd24Hr || asset.vwap24Hr) || 0,
        volume: parseFloat(asset.volumeUsd24Hr) || 0,
        supply: parseFloat(asset.supply) || 0,
        name: asset.name || '',
        website: asset.website || '',
        explorer: asset.explorer || '',
      })
    },

  },


  actions: {

    retrieve({ getters, dispatch }, { ids, cache, log }) {
      return new Promise((resolve, reject) => {
        let options = Object.assign({}, X4WP.VENDORS.requests.coincapAssets, {
          log,
          cache,
          name: 'coincapAssets',
        })

        if (ids) {
          options.name += '_' + ids.join(',')
          options.url += '&ids=' + ids.join(',')
        }

        dispatch('helpers/request', options)
          .then(resp => {
            let assets = {}

            if (!resp || !resp.data) {
              return reject()
            }

            resp.data.forEach(data => {
              assets[data.id] = getters['coincap/assets/format']({ asset: data })
            })

            resolve({ assets })
          })
          .catch(xmlHttp => {
            reject()
          })
      })
    },

  },

})
