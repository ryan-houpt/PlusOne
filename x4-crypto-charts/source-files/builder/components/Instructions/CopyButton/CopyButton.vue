<template lang="pug">

  Button.x4-copy-button(
    :scale=".75"
    :options="options"
    @click="click")

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      Button: require('Button'),
    }),


    computed: map.variables({

      options() {
        return {
          icon: 'save',
          label: 'Copy',
          flylabel: 'Copied!',
        }
      },

    }),


    methods: map.variables({

      click() {
        window.getSelection().selectAllChildren(this.$parent.$refs.code)
        document.execCommand('copy')
        this.flyforce()
      },

    }),

  }

</script>
