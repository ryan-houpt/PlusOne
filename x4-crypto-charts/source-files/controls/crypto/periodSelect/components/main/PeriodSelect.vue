<template lang="pug">

  RadioButtons.x4-period-select(
    :scale="scale"
    :value="value"
    :options="options2"
    @change="change")

    Style
      include ./PeriodSelect.sass

</template>


<script>

  import map from 'map'

  let x4plugin = window['X4WP.GLOB_NAME']


  export default {

    props: ['coin', 'options', 'scale'],


    components: map.components({
      Style: require('Style'),
      RadioButtons: require('RadioButtons'),
    }),


    computed: map.variables({

      value({ state }) {
        return x4plugin.multiValues[state.type].period
          ? state.values.period[this.coin] || state.defaults.period
          : state.values.period
      },

      options1({ state }) {
        return state.controls.periodSelect
      },

      options2({ state }) {
        return Object.assign({}, this.options1, {
          theme: this.options1.theme || (this.options ? this.options.theme : null) || state.theme,
          subtheme: this.options1.subtheme || (this.options ? this.options.subtheme : null) || state.subtheme,
          colors: Object.assign({}, state.colors, (this.options ? this.options.colors : null), this.options1.colors),
        })
      },

    }),


    methods: map.variables({

      change({ commit }, { value }) {
        commit('PERIOD_CHANGE', { id: this.coin, period: value })        
      },

    }),

  }

</script>
