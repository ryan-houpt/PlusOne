<template lang="pug">
  
  BBGroup(
    title="Values")

    template(
      v-for="name in valOrder"
      v-if="components[name]")

      Value(
        :name="name"
        :component="components[name]")

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      BBGroup: require('BBGroup'),
      Value: require('./Value'),
    }),


    computed: map.variables({

      valOrder({ state }) {
        return X4WP.WIDGETS[state.type].valOrder
      },

      components({ state }) {
        return X4WP.BUI_VALUES
      },

    }),

  }

</script>
