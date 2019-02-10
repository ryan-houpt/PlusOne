export default () => ({

  name: 'coincap/assetsMeta',


  getters: {

    format() {
      return ({ assetsMeta }) => ({
        website: assetsMeta.website,
        explorer: assetsMeta.explorer,
      })
    },

  },


  actions: {

    retrieve({ getters, dispatch }, { cache, log }) {
      return new Promise((resolve, reject) => {
        let options = Object.assign({}, X4WP.VENDORS.requests.coincapAssetsMeta, {
          log,
          cache,
          name: 'coincapAssetsMeta',
        })

        dispatch('helpers/request', options)
          .then(resp => {
            let assetsMeta = {}

            if (!resp || !resp.data) {
              return reject()
            }

            resp.data.assets.edges.forEach(data => {
              assetsMeta[data.node.id] = getters['coincap/assetsMeta/format']({ assetsMeta: data.node })
            })

            resolve({ assetsMeta })
          })
          .catch(xmlHttp => {
            reject()
          })
      })
    },

  },

})
