<template lang="pug">

  div(
    :is="component"
    :class="baseClass"
    :id="baseID")

    template(slot="base")
      BuilderOpen
      Loader

    Style(slot="styles")
      include /common/components/AppBase.sass
      include ./AppMain.sass

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      Style: require('Style'),
      BuilderOpen: require('./BuilderOpen'),
      Loader: require('Base/Loader'),
    }),


    mounted() {
      let attributes = this.$root.attributes

      for (let name in attributes) {
        if (name !== 'id' && name !== 'class') {
          this.$el.setAttribute(name, attributes[name])
        }
      }
    },


    computed: map.variables({

      margins({ state }) {
        return state.margins
      },

      component({ state }) {
        return X4WP.WIDGET_COMPONENTS[state.type]
      },

      baseClass({ state }) {
        let result = {}

        result['x4-app'] = true
        result['x4-' + state.type.replace(/([A-Z])/, '-$1').toLowerCase()] = true

        if (this.$root.attributes.class) {
          result[this.$root.attributes.class] = true
        }

        return result
      },

      baseID() {
        return this.$root.attributes.id || null
      },

    }),

  }

</script>
