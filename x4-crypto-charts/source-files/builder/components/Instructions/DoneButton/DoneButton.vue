<template lang="pug">

  DIV.x4-done-button

    Button(
      :scale="1.5"
      :options="{ subtheme: 'outlined', icon: 'done', label: 'Done' }"
      @click="click")

    Style
      include ./DoneButton.sass

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      Button: require('Button'),
    }),


    methods: map.variables({

      click({ dispatch }) {
        dispatch('builder/instructions/hide')
      },

    }),

  }

</script>
