<template lang="pug">

  div.x4-step

    div.x4-title.x4-margin-bottom
      | Step #2: Insert widget

    div.x4-text.x4-margin-bottom
      | Put the following code snippet inside the&nbsp;
      code &lt;
        span.x4-red body
        | &gt;
      | &nbsp;tag somewhere you want to insert the widget on your html page:

    code.x4-code.x4-margin-bottom

      CopyButton

      span.x4-inside(ref="code")

        | &lt;
        span.x4-red div

        | &nbsp;
        span.x4-green {{ selType }}
        | =
        span.x4-yellow "{{ selValue }}"

        | &gt;&lt;/
        span.x4-red div
        | &gt;&lt;
        span.x4-red script
        | &gt;window.X4WP.GLOB_NAME=window.X4WP.GLOB_NAME||[];window.X4WP.GLOB_NAME.push({{ initCode }});&lt;/
        span.x4-red script
        | &gt;

    ShowOptions

      Input(
        :value="selector"
        :options="{ icon: 'public', label: 'CSS selector of the widget' }"
        @change="selChange")

</template>


<script>

  import map from 'map'

  
  export default {

    props: ['selector'],


    components: map.components({
      Input: require('Input'),
      RadioButtons: require('RadioButtons'),
      CopyButton: require('../../CopyButton'),
      ShowOptions: require('../../ShowOptions'),
    }),


    computed: map.variables({

      initCode({ state }) {
        let init = Object.assign({}, state.builder.instructions.init, {
          selector: this.selector,
        })

        return JSON.stringify(init)
      },

      selType() {
        let result = ''

        if (this.selector.substr(0, 1) === '#') {
          result = 'id'
        }

        if (this.selector.substr(0, 1) === '.') {
          result = 'class'
        }

        return result
      },

      selValue() {
        return this.selector.replace(/^#|\./, '')
      },

    }),


    methods: map.variables({

      selChange(context, { value }) {
        this.$emit('selChange', { value })
      },

    }),

  }

</script>
