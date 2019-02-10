import __ from '__'


export default () => ({

  name: 'helpers/items',


  getters: {

    'format/price'(state) {
      return (value, { notags }, coin, { fiat }) => {
        return value / fiat.price
      }
    },


    'format/coin'(state) {
      return (value, { notags }, coin) => {
        value = value.replace(/\[icon\]/g, !notags ? '<img class="x4-icon" src="https://static.coincap.io/assets/icons/' + coin.short.toLowerCase() + '@2x.png" onError="this.src=\'https://coincap.io/static/logo_mark.png\'" />' : '')
        value = value.replace(/\[name\]/g, !notags ? '<div class="x4-name">' + __(coin.name) + '</div>' : coin.name)
        value = value.replace(/\[short\]/g, !notags ? '<div class="x4-short">' + __(coin.short) + '</div>' : coin.short)

        return value
      }
    },


    'format/fiat'() {
      return (value, { notags }, coin, { fiat }) => {
        if (value.indexOf('[symbol]') !== -1) {
          if (fiat.symbol) {
            value = value.replace('[symbol]', !notags ? '<div class="x4-symbol">' + fiat.symbol + '</div>' : fiat.symbol)
            value = value.replace(/(&nbsp;)?\[short\](&nbsp;)?/, '')
          } else {
            value = value.replace('[symbol]', '')
          }
        }

        if (value.indexOf('[short]') !== -1) {
          value = value.replace('[short]', !notags ? '<div class="x4-short">' + fiat.short + '</div>' : fiat.short)
        }

        return value
      }
    },

  },

})
