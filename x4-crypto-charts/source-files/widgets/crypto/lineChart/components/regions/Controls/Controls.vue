<template lang="pug">

  DIV(
    v-if="controlsVisible"
    :class="baseClass")

    FiatSelect

    Style
      include ./Controls.sass

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      FiatSelect: require('Main/FiatSelect'),
    }),


    data() {
      return {
        medium: false,
      }
    },


    watch: {

      margins: {
        handler() {
          setTimeout(() => this.resize())
        },
        deep: true,
      },

    },


    created() {
      window.addEventListener('resize', this.resize)
    },


    mounted() {
      this.resize()
    },


    destroyed() {
      window.removeEventListener('resize', this.resize)
    },


    computed: map.variables({

      margins({ state }) {
        return state.margins
      },

      baseClass({ state }) {
        return {
          'x4-controls': true,
          'x4-medium': this.medium,
        }
      },

      controlsVisible({ state }) {
        return state.controls.fiatSelect.visible
      },

    }),


    methods: map.variables({

      resize() {
        this.medium = this.$el.offsetWidth < 688
      },

    }),

  }

</script>
