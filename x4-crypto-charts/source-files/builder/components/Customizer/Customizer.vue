<template lang="pug">
  
  transition(name="x4" appear)

    DIV(
      v-if="visible"
      :class="baseClass")

      HeadTop

      div.x4-inside.x4-scrollable(
        @wheel="wheelPrevent"
        ref="inside")

        BaseOptions
        Controls
        Values

      Style
        include ./Customizer.sass

</template>


<script>

  import map from 'map'

  let globName = 'X4WP.GLOB_NAME'
  let x4builder = x4wp.builders[globName]


  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      HeadTop: require('./HeadTop'),
      BaseOptions: require('./BaseOptions'),
      Controls: require('./Controls'),
      Values: require('./Values'),
    }),


    computed: map.variables({

      baseClass({ state }) {
        return {
          'x4-customizer': true,
          'x4-wp-offset': 'X4WP.INSTANCE' === 'wp' && !!document.getElementById('wpadminbar') && document.getElementById('wpadminbar').style.display !== 'none',
          'x4-pos-right': state.builder.position === 'right',
          'x4-def-scroll': window.isIE || window.isEdge || window.isFirefox,
          'x4-transition': true,
        }
      },

      visible({ state }) {
        return state.builder.opened && !state.builder.instructions.visible
      },

    }),


    methods: map.variables({

      wheelPrevent({ getters }, event) {
        if (!window.x4gutenberg) {
          getters['helpers/wheelPrevent']({ el: this.$refs.inside, event })
        }
      },

    }),

  }

</script>
