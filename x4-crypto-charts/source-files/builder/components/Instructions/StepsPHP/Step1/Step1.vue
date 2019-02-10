<template lang="pug">

  div.x4-step

    div.x4-title.x4-margin-bottom
      | Step #1: Load plugin

    div.x4-text
      | Put the following line of code at the top of your PHP script:

    code.x4-code.x4-margin-bottom

      CopyButton

      span.x4-inside(ref="code")

        | &lt;?php&nbsp;
        span.x4-red require_once
        | (
        span.x4-blue dirname
        | (
        span.x4-purple __FILE__
        | )&nbsp;
        span.x4-red .
        | &nbsp;
        span.x4-yellow '{{ path }}'
        | );&nbsp;?&gt;

    ShowOptions

      Input.x4-margin-bottom(
        :value="path"
        :options="{ icon: 'public', label: 'Relative path to the \"X4WP.PLUGIN.php\" file' }"
        @change="pathChange")

</template>


<script>

  import map from 'map'

  
  export default {

    components: map.components({
      Input: require('Input'),
      CopyButton: require('../../CopyButton'),
      ShowOptions: require('../../ShowOptions'),
    }),


    data() {
      return {
        path: '/../x4-crypto-tables.php',
      }
    },


    methods: map.variables({

      pathChange(context, { value }) {
        this.path = value
      },

    }),

  }

</script>
