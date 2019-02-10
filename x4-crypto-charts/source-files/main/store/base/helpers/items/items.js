import wait from '~/common/bootstrap/wait'


export default () => ({

  name: 'helpers/items',


  getters: {

    src() {
      return ({ src }) => {
        let result = src

        if (typeof src === 'string') {
          result = this

          src.split('.').forEach(name => {
            result = result[name]
          })
        }

        return result
      }
    },


    sortable() {
      return ({ $el, options }) => {
        return new Promise(resolve => {
          wait(
            () => {
              return !!window.Sortable
            },
            () => {
              let Sortable = window.Sortable

              let sortable = Sortable.create($el, Object.assign({}, options, {
                sort: true,
                animation: 150,
                ghostClass: 'x4-sortable-ghost',
                chosenClass: 'x4-sortable-chosen',
                dragClass: 'x4-sortable-drag',
              }))

              resolve({ sortable })
            },
          )
        })
      }
    },


    get() {
      return ({ hash, strategy, except, top, filters, sort }) => {
        let rtop = []
        let list = []

        if (!strategy || strategy === 'include_all') {
          if (except && except.length > 0) {
            for (let key in hash) {
              if (except.indexOf(key) === -1) {
                list.push(hash[key])
              }
            }
          } else {
            list = Object.values(hash)
          }
        } else {
          if (except && except.length > 0) {
            except.forEach(key => {
              if (hash[key]) {
                list.push(hash[key])
              }
            })
          }
        }

        if (filters) {
          filters.forEach(filter => {
            list = list.filter(item => filter(item))
          })
        }

        if (top && top.length > 0) {
          top = top.map(key => hash[key]).filter(item => !!item)

          list = list.filter(item => {
            let index = top.indexOf(item)

            if (index !== -1) {
              rtop[index] = item
              return false
            }

            return true
          })

          rtop = rtop.filter(item => !!item)
        }

        if (sort) {
          let field = sort.split(':').shift()
          let type = sort.split(':').pop()

          let less = type === 'asc' ? -1 : 1
          let more = type === 'asc' ? 1 : -1

          list.sort((item1, item2) => {
            return item1[field] < item2[field]
              ? less
              : item1[field] === item2[field]
                ? 0
                : more
          })
        }

        return rtop.concat(list)
      }
    },

  },

})
