<template lang="pug">

  DIV(
    :level="3")

    slot(name="base")

    slot(name="controls")
    slot(name="period-select")
    slot(name="line-chart")

    slot(name="styles")

    Style
      include ./FullFeatured_1.sass

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
    }),

  }

</script>
