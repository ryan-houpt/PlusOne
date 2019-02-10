<template lang="pug">

  div.x4-steps

    Step1(
      :selector="selector")

    Step2(
      :selector="selector"
      @selChange="selChange")

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      Step1: require('./Step1'),
      Step2: require('./Step2'),
    }),


    data() {
      return {
        selector: this.$store.state.selector,
      }
    },


    methods: map.variables({

      selChange(context, { value }) {
        this.selector = value
      },

    }),

  }

</script>
