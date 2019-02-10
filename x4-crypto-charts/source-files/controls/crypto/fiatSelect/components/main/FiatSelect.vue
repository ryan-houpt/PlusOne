<template lang="pug">

  Input.x4-fiat-select(
    type="select"
    :value="value"
    :options="options"
    @change="change")

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      Input: require('Input'),
    }),


    computed: map.variables({

      value({ state }) {
        return state.values.fiat
      },

      options({ state }) {
        return state.controls.fiatSelect
      },

    }),


    methods: map.variables({

      change({ commit }, { value }) {
        commit('FIAT_CHANGE', { fiat: value })
      },

    }),

  }

</script>
