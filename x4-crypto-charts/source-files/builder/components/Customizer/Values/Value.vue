<template lang="pug">
  
  div(
    :is="component"
    :value="value"
    :schema="schema")

</template>


<script>

  import map from 'map'

  let x4wp = window.x4wp
  let x4plugin = window['X4WP.GLOB_NAME']
  let x4builder = x4wp.builders['X4WP.GLOB_NAME']

  
  export default {

    props: ['name', 'component'],


    computed: map.variables({

      schema({ state }) {
        return x4builder.schema[state.type].values[this.name]
      },

      value({ state, getters }) {
        let path = this.schema.path instanceof Object
          ? this.schema.path.value
          : this.schema.path

        if (x4plugin.multiValues[state.type][this.name]) {
          path = path.replace(/values\./, 'defaults.')
        }

        return getters['helpers/items/src']({
          src: 'state.' + path,
        })
      },

    }),

  }

</script>
