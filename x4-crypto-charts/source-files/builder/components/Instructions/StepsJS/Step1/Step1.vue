<template lang="pug">

  div.x4-step

    div.x4-title.x4-margin-bottom
      | Step #1: Load plugin

    div.x4-text
      | Put the following line of code inside the&nbsp;
      code &lt;
        span.x4-red head
        | &gt;
      | &nbsp;tag of your html page:

    div.x4-hint.x4-margin-bottom
      | (preferably before other styles and scripts, because it loads asynchronously)

    code.x4-code.x4-margin-bottom

      CopyButton

      span.x4-inside(ref="code")

        | &lt;
        span.x4-red script

        | &nbsp;
        span.x4-green src
        | =
        span.x4-yellow "{{ url }}"

        | &nbsp;
        span.x4-green data-entry
        | =
        span.x4-yellow "X4WP.PLUGIN"

        template(
          v-if="builder.enabled")
          | &nbsp;
          span.x4-green data-vc-enabled

        template(
          v-if="builder.enabled && builder.right")
          | &nbsp;
          span.x4-green data-vc-right

        template(
          v-if="builder.enabled && builder.invert")
          | &nbsp;
          span.x4-green data-vc-invert

        | &nbsp;
        span.x4-green async

        | &gt;&lt;/
        span.x4-red script
        | &gt;

    ShowOptions

      Input.x4-margin-bottom(
        :value="url"
        :options="{ icon: 'public', label: 'Absolute or relative URL of the \"X4WP.PLUGIN.js\" file' }"
        @change="urlChange")

      Checkbox(
        :value="builder.enabled"
        :options="{ title: 'enable the Visual Customizer on the page' }"
        @change="builderEnabledChange")

      Checkbox(
        :value="builder.right"
        :options="{ title: 'move the Visual Customizer to the right' }"
        @change="builderRightChange")

      Checkbox(
        :value="builder.invert"
        :options="{ title: 'invert the Visual Customizer colors' }"
        @change="builderInvertChange")

</template>


<script>

  import map from 'map'

  
  export default {

    props: ['selector'],


    components: map.components({
      Input: require('Input'),
      Checkbox: require('Checkbox'),
      CopyButton: require('../../CopyButton'),
      ShowOptions: require('../../ShowOptions'),
    }),


    data() {
      let script = document.querySelector('script[data-entry="X4WP.PLUGIN"]')

      return {
        builder: {
          enabled: true,
          right: false,
          invert: false,
        },
        url: script.getAttribute('src'),
      }
    },


    methods: map.variables({

      urlChange(context, { value }) {
        this.url = value
      },

      builderEnabledChange(context, { value }) {
        this.builder.enabled = value

        if (!value) {
          for (let key in this.builder) {
            this.builder[key] = false
          }
        }
      },

      builderRightChange(context, { value }) {
        this.builder.right = value

        if (value && !this.builder.enabled) {
          this.builder.enabled = true
        }
      },

      builderInvertChange(context, { value }) {
        this.builder.invert = value

        if (value && !this.builder.enabled) {
          this.builder.enabled = true
        }
      },

    }),

  }

</script>
