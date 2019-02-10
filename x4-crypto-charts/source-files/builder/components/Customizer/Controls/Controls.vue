<template lang="pug">
  
  BBGroup(
    title="Controls")

    template(
      v-for="name in contrOrder"
      v-if="components[name]")

      Control(
        :name="name"
        :component="components[name]")

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      BBGroup: require('BBGroup'),
      Control: require('./Control'),
    }),


    computed: map.variables({

      contrOrder({ state }) {
        return X4WP.WIDGETS[state.type].contrOrder
      },

      components({ state }) {
        return X4WP.BUI_CONTROLS
      },

    }),

  }

</script>
