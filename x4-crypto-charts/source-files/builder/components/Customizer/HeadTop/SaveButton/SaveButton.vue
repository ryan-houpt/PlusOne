<template lang="pug">
  
  DIV.x4-save-button

    Button(
      :scale=".75"
      :options="options"
      @click="click")

    Style
      include ./SaveButton.sass

</template>


<script>

  import map from 'map'

  let globName = 'X4WP.GLOB_NAME'
  let x4plugin = window[globName]

  
  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      Button: require('Button'),
    }),


    data() {
      return {
        loading: false,
        flylabel: true,
      }
    },


    computed: map.variables({

      options() {
        return {
          subtheme: 'outlined',
          icon: 'save',
          label: 'Save Changes',
          loading: this.loading,
          flylabel: 'Widget Saved',
          flytiny: true,
          flydown: true,
        }
      },

    }),


    methods: map.variables({

      click({ getters, dispatch }) {
        let ajax_url = window.X4WP_ajax_url
        let init = getters['builder/calc/init']()

        if ('X4WP.INSTANCE' === 'wp') {
          this.loading = true

          if (!ajax_url) {
            setTimeout(() => {
              this.loading = false
              this.flylabel = 'Widget Saved'
              this.flyforce()
            }, 2000)

            return
          }

          dispatch('builder/options/save', { init })
            .then(resp => {
              this.loading = false
              this.flylabel = 'Widget Saved'
              this.flyforce()
            })
            .catch(err => {
              this.loading = false
              this.flylabel = err.message
              this.flyforce()
            })

          return
        }

        dispatch('builder/instructions/show', { init })
      },

    }),

  }

</script>
