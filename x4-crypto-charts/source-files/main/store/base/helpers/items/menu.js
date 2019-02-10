import __ from '__'


export default () => ({

  name: 'helpers/items/menu',


  getters: {

    hash(state, getters) {
      return ({ items, itemValue, itemTitle, itemTemplate, hasNull }) => {
        let result = {}

        if (hasNull) {
          result[null] = ''
        }

        for (let key in items) {
          let value = itemValue !== '_key' && itemValue !== '_value'
            ? items[key][itemValue]
            : itemValue === '_value'
              ? items[key]
              : key

          let title = ''

          if (itemTitle) {
            title = __(itemTitle !== '_key' && itemTitle !== '_value'
              ? items[key][itemTitle]
              : itemTitle === '_value'
                ? items[key]
                : key)
          }

          if (itemTemplate) {
            title = getters['helpers/items/format/template'](null, {
              template: itemTemplate,
              patterns: items[key],
            })
          }

          result[value] = title
        }

        return result
      }
    },


    options() {
      return ({ items, itemValue, hasNull }) => {
        let result = []

        if (hasNull) {
          result.push(null)
        }

        for (let key in items) {
          result.push(itemValue !== '_key' && itemValue !== '_value'
            ? items[key][itemValue]
            : itemValue === '_value'
              ? items[key]
              : key)
        }

        return result
      }
    },

  },

})
