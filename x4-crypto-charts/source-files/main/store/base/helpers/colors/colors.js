export default () => ({

  name: 'helpers/colors',


  getters: {

    rgba2hex() {
      return ({ rgba }) => {
        rgba = rgba.match(/^rgba\(\s*([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([0-9.]+)\s*\)$/)

        if (!rgba) {
          return '#000000'
        }

        let r = ('0' + parseInt(rgba[1], 10).toString(16)).slice(-2)
        let g = ('0' + parseInt(rgba[2], 10).toString(16)).slice(-2)
        let b = ('0' + parseInt(rgba[3], 10).toString(16)).slice(-2)

        if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1]) {
          r = r[0]
          g = g[0]
          b = b[0]
        } 

        return '#' + r + g + b
      }
    },


    rgba2opacity() {
      return ({ rgba }) => {
        rgba = rgba.match(/^rgba\(\s*([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([0-9.]+)\s*\)$/i)

        if (!rgba) {
          return 1
        }

        return parseFloat(rgba[4]).toFixed(2)
      }
    },


    'rgba/opacity'() {
      return ({ rgba, opacity }) => {
        if (opacity < 1) {
          opacity = opacity.toString().replace('0.', '.')
        }

        return rgba.replace(/,\s*[0-9.]+\s*\)$/, ',' + opacity + ')')
      }
    },


    hex2rgba() {
      return ({ hex, opacity }) => {
        if (!hex || !hex.match(/^#[0-9a-f]+$/i) || (hex.length !== 7 && hex.length !== 4)) {
          return 'rgba(0,0,0,0)'
        }

        opacity = !isNaN(opacity) ? opacity : 1
        hex = hex.replace('#', '').split('')

        if (hex.length === 3) {
          hex.splice(0, 0, hex[0])
          hex.splice(2, 0, hex[2])
          hex.splice(4, 0, hex[4])
        }

        let r = parseInt(hex[0] + hex[1], 16)
        let g = parseInt(hex[2] + hex[3], 16)
        let b = parseInt(hex[4] + hex[5], 16)

        if (opacity < 1) {
          opacity = opacity.toString().replace('0.', '.')
        }

        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'
      }
    },

  },

})
