export default () => ({

  name: 'helpers/wheelPrevent',


  getters: {

    _name() {
      return ({ el, event }) => {
        if ((el.scrollTop === 0 && event.deltaY < 0) || (Math.abs(el.scrollTop - (el.scrollHeight - el.clientHeight)) <= 1 && event.deltaY > 0)) {
          event.preventDefault()
        }

        event.stopPropagation()
      }
    },

  },

})
