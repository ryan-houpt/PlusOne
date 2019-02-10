<template lang="pug">

  div(
    :is="component")

    slot(name="base" slot="base")
    slot(name="styles" slot="styles")

    template(
      v-if="dataLoaded")

      FiatSelect(
        slot="fiat-select")

      PeriodSelect(
        slot="period-select")

      LineChart(
        slot="line-chart")

      Controls(
        slot="controls")

</template>


<script>

  import map from 'map'
  import layouts from './layouts'


  export default {

    components: map.components({
      FiatSelect: require('Main/FiatSelect'),
      PeriodSelect: require('Main/PeriodSelect'),
      LineChart: require('Main/LineChart'),
      Controls: require('./regions/Controls'),
    }),


    computed: map.variables({

      component({ state }) {
        return layouts[state.layout][state.sublayout]
      },

      dataLoaded({ state }) {
        return state.bootstrap === undefined || state.bootstrap.isLoaded === undefined || state.bootstrap.isLoaded === true
      },

    }),

  }

</script>
