<template lang="pug">
  
  BSInput(
    :value="value"
    :schema="schema")

</template>


<script>

  import map from 'map'

  
  export default {

    props: ['value', 'schema'],


    components: map.components({
      BSInput: require('BSInput'),
    }),

  }

</script>
