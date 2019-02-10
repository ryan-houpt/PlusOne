<template lang="pug">

  DIV(
    :class="baseClass")

    Customizer
    Instructions

    Style
      include /common/components/AppBase.sass
      include ./AppBuilder.sass

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      Customizer: require('./Customizer'),
      Instructions: require('./Instructions'),
    }),


    computed: map.variables({

      baseClass({ state }) {
        return {
          'x4-app': true,
          'x4-builder': true,
        }
      },

    }),

  }

</script>
