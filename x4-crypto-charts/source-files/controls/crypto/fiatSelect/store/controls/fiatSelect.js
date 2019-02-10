export default ({ options }) => ({

  name: 'controls/fiatSelect',


  state: options.controls.fiatSelect,


  getters: {

    _name(state, getters) {
      return getters['helpers/items/get']({
        hash: state.entities.fiats,
        strategy: state.controls.fiatSelect.strategy,
        except: state.controls.fiatSelect.except,
        top: state.controls.fiatSelect.top,
        sort: 'short:asc',
      })
    },

  },

})
