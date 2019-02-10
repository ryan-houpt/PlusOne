<template lang="pug">
  
  BBGroup(
    title="Base options")

    BSTheme
    BSLayout
    BSColors

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      BBGroup: require('BBGroup'),
      BSTheme: require('BSTheme'),
      BSLayout: require('BSLayout'),
      BSColors: require('BSColors'),
    }),

  }

</script>
