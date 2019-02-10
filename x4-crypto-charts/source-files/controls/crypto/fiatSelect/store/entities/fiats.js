export default () => ({

  name: 'entities/fiats',


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
