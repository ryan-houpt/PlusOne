<template lang="pug">
  
  DIV.x4-close-button

    Icon.x4-transition(
      icon="close"
      title="Close"
      @click.native="click")

    Style
      include ./CloseButton.sass

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      Icon: require('Icon'),
    }),


    methods: map.variables({

      click({ dispatch }) {
        dispatch('builder/close')
      },

    }),

  }

</script>
