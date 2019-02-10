export default () => ({

  name: 'helpers/wprequest',


  actions: {

    _name({ dispatch }, { action, body }) {
      let ajax_url = window.X4WP_ajax_url

      return new Promise((resolve, reject) => {
        let options = {
          url: ajax_url,
          method: 'POST',
          contentType: 'urlencoded',
          body: { action, body: body || {} },
          cache: false,
        }

        dispatch('helpers/request', options)
          .then(resp => {
            if (!resp.success) {
              if ('X4WP.MODE' === 'development') {
                console.error(resp.data.message)
              }

              return reject(resp.data)
            }

            resolve(resp.data)
          })
          .catch(xmlHttp => {
            reject({ message: xmlHttp.statusText })
          })
      })
    },

  },

})
