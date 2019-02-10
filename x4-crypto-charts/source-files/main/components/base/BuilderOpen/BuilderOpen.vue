<template lang="pug">

  DIV(
    v-if="visible"
    title="Visual Customizer"
    :class="baseClass")

    Icon.x4-icon(
      icon="settings"
      @click.native="open")

    Style
      include ./BuilderOpen.sass

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      Icon: require('Icon'),
    }),


    computed: map.variables({

      visible({ state }) {
        return state.builder.enabled && !state.builder.opened
      },

      baseClass() {
        return {
          'x4-builder-open': true,
          'x4-transition': true,
        }
      },

      marginRight({ state }) {
        return state.margins.right
      },

    }),


    methods: map.variables({

      open({ dispatch }) {
        dispatch('builder/open')
      },

    }),

  }

</script>
