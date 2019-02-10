<template lang="pug">
  
  Icon.x4-transition(
    icon="cancel"
    title="Cancel changes"
    @click.native="click")

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      Icon: require('Icon'),
    }),


    methods: map.variables({

      click({ dispatch }) {
        dispatch('builder/reset/initial')
      },

    }),

  }

</script>
