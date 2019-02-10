<template lang="pug">
  
  DIV.x4-head-top

    CloseButton
    SaveButton

    div.x4-buttons
      ResetInitial
      ResetDefault
      InvertButton
      RightButton

    Style
      include ./HeadTop.sass

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      CloseButton: require('./CloseButton'),
      SaveButton: require('./SaveButton'),
      ResetInitial: require('./ResetInitial'),
      ResetDefault: require('./ResetDefault'),
      InvertButton: require('./InvertButton'),
      RightButton: require('./RightButton'),
    }),

  }

</script>
