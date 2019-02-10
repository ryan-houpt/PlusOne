<template lang="pug">
  
  div(
    :is="component"
    :path="path"
    :values="values"
    :defaults="defaults"
    :schema="schema"
    :vvalue="vvalue"
    :vschema="vschema")

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
        return x4builder.schema[state.type].controls[this.name]
      },

      defaults({ state }) {
        return x4plugin.defaults[state.type].controls[this.name]
      },

      path() {
        return this.schema.path
      },

      values({ getters }) {
        return getters['helpers/items/src']({ src: 'state.' + this.path })
      },

      vschema({ state }) {
        return this.schema.value
          ? x4builder.schema[state.type].values[this.schema.value]
          : null
      },

      vvalue({ state, getters }) {
        let path = this.vschema
          ? this.vschema.path instanceof Object
            ? this.vschema.path.value
            : this.vschema.path
          : null

        if (this.vschema && x4plugin.multiValues[state.type][this.schema.value]) {
          path = path.replace(/values\./, 'defaults.')
        }

        return this.vschema
          ? getters['helpers/items/src']({
              src: 'state.' + path,
            })
          : null
      },

    }),

  }

</script>
