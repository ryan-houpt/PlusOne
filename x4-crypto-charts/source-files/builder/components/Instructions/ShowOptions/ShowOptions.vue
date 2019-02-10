<template lang="pug">

  DIV(
    :class="baseClass")

    div.x4-header(
      @click="toggleShowOptions")

      Icon.x4-icon.x4-transition(
        icon="arrow_right")

      div
        | Show additional options

    DropDown.x4-options(
      :opened="showOptions")

      slot

    Style
      include ./ShowOptions.sass

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      Icon: require('Icon'),
      DropDown: require('DropDown'),
    }),


    data() {
      return {
        showOptions: false,
      }
    },


    computed: map.variables({

      baseClass() {
        return {
          'x4-show-options': true,
          'x4-active': this.showOptions,
        }
      },

    }),


    methods: map.variables({

      toggleShowOptions() {
        this.showOptions = !this.showOptions
      },

    }),

  }

</script>
