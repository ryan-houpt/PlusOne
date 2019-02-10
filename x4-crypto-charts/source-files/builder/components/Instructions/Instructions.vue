<template lang="pug">

  transition(name="x4")

    DIV(
      v-if="visible"
      :class="baseClass")

      div.x4-inside.x4-scrollable.x4-transition(
        ref="inside"
        @wheel="wheelPrevent")

        CloseButton

        div.x4-content

          div(
            :is="stepsComponent")

          DoneButton

      Style
        include ./Instructions.sass

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      CloseButton: require('./CloseButton'),
      DoneButton: require('./DoneButton'),
    }),


    computed: map.variables({

      baseClass({ state }) {
        return {
          'x4-instructions': true,
          'x4-pos-right': state.builder.position === 'right',
          'x4-def-scroll': window.isIE || window.isEdge || window.isFirefox,
          'x4-transition': true,
        }
      },

      visible({ state }) {
        return state.builder.instructions.visible
      },

      stepsComponent() {
        if ('X4WP.INSTANCE' === 'js') return require('./StepsJS').default
        if ('X4WP.INSTANCE' === 'php') return require('./StepsPHP').default
        return null
      },

    }),


    methods: map.variables({

      wheelPrevent({ getters }, event) {
        getters['helpers/wheelPrevent']({ el: this.$refs.inside, event })
      },

    }),

  }

</script>
