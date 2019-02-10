import __ from '__'


export default () => ({

  name: 'helpers/items',


  getters: {

    'format/valtag'() {
      return (value, { notags }) => {
        return !notags
          ? '<div class="x4-val">' + value + '</div>'
          : value
      }
    },


    'format/template'() {
      return (value, { template, patterns, notags }) => {
        let result = __(template) || ''

        if (!notags) {
          result = result.replace(/\s/g, '&nbsp;')
        }

        if (value !== null) {
          result = result.replace('[value]', __(value))
        }

        if (patterns) {
          result = result.replace(/\[([^\]]+)\]/g, (match, options) => {
            options = options.split(',')

            let name = options[0]
            let prefix = options[1]
            let suffix = options[2]

            return patterns[name] !== undefined && patterns[name] !== ''
              ? (prefix || '') + __(patterns[name]) + (suffix || '')
              : ''
          })
        }

        return result
      }
    },


    'format/number'() {
      return (value, { factor, separator, precision, notags }) => {
        value = value !== undefined
          ? value
          : 0

        precision = precision !== undefined
          ? precision
          : 0

        let abbreviations = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
        let abbreviation = ''

        if (factor) {
          let max = factor !== 'auto'
            ? abbreviations.indexOf(factor) + 1
            : 8

          for (let i = 0; i < max; i++) {
            let val = value / 1000

            if (factor === 'auto' && val < 1) {
              break
            }

            abbreviation = abbreviations[i]
            value = val
          }
        }

        if (precision === 'auto') {
          if (value >= 100) {
            precision = 0
          } else if (value >= 10 && value < 100) {
            precision = 1
          } else if (value >= 0.1 && value < 10) {
            precision = 2
          } else if (value >= 0.01 && value < 0.1) {
            precision = 3
          } else if (value >= 0.001 && value < 0.01) {
            precision = 4
          } else if (value >= 0.0001 && value < 0.001) {
            precision = 5
          } else if (value >= 0.00001 && value < 0.0001) {
            precision = 6
          } else if (value >= 0.000001 && value < 0.00001) {
            precision = 7
          } else if (value < 0.000001) {
            precision = 8
          }
        }

        value = value.toFixed(precision).toString().split('.')

        if (separator) {
          value[0] = value[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
        }

        value = value.join('.') + abbreviation

        return !notags
          ? '<div class="x4-number">' + value + '</div>'
          : value
      }
    },

  },

})
