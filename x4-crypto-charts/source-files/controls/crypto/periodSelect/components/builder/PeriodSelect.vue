<template lang="pug">

  BSRadios(
    :path="path"
    :values="values"
    :defaults="defaults"
    :schema="schema"
    :vvalue="vvalue"
    :vschema="vschema")

</template>


<script>

  import map from 'map'


  export default {

    props: ['path', 'values', 'defaults', 'schema', 'vvalue', 'vschema'],


    components: map.components({
      BSRadios: require('BSRadios'),
    }),

  }

</script>
