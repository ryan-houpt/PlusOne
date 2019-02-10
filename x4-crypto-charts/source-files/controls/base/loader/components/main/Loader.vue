<template lang="pug">

  Loader(
    v-if="loader && loader.visible && !dataLoaded"
    :colorize="loader.colorize"
    :size="loader.size")

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      Loader: require('Loader'),
    }),


    computed: map.variables({

      loader({ state }) {
        return state.controls.loader
      },

      dataLoaded({ state }) {
        return state.bootstrap === undefined || state.bootstrap.isLoaded === undefined || state.bootstrap.isLoaded === true
      },

    }),

  }

</script>
