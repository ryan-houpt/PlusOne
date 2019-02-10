<template lang="pug">

  DIV(
    v-if="options2.visible"
    :class="baseClass")

    Loader(
      v-if="!isLoaded && options2.loader.visible"
      :colorize="options2.loader.colorize"
      :size="200")

    template(
      v-if="isLoaded")

      WaterMark(
        :coin1="coinInst1"
        :coin2="coinInst2"
        :coin3="coinInst3"
        :coin4="coinInst4"
        :options="options2")

      div.x4-inside(
        :style="insideStyle")

        Chart(
          :coin1="coinInst1"
          :coin2="coinInst2"
          :coin3="coinInst3"
          :coin4="coinInst4"
          :period="period"
          :options="options2")


    Style(
      :colors="options2.colors")
      include ./LineChart.sass

    Style(
      v-if="options2.theme === 'material'"
      :colors="options2.colors")
      include ./themes/ChartMaterial/ChartMaterial.sass

</template>


<script>

  import map from 'map'

  let x4plugin = window['X4WP.GLOB_NAME']


  export default {

    props: ['coin1', 'coin2', 'coin3', 'coin4', 'options'],


    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
      Loader: require('Loader'),
      WaterMark: require('./WaterMark'),
      Chart: require('./Chart'),
    }),


    created() {
      this.ensureHistory()
    },


    watch: {

      coinInst1(value) {
        this.ensureHistory()
      },

      coinInst2(value) {
        this.ensureHistory()
      },

      coinInst3(value) {
        this.ensureHistory()
      },

      coinInst4(value) {
        this.ensureHistory()
      },

      period(value) {
        this.ensureHistory()
      },

    },


    computed: map.variables({

      options1({ state }) {
        return state.controls.lineChart
      },

      options2({ state }) {
        return Object.assign({}, this.options1, {
          theme: this.options1.theme || (this.options ? this.options.theme : null) || state.theme,
          subtheme: this.options1.subtheme || (this.options ? this.options.subtheme : null) || state.subtheme,
          colors: Object.assign({}, state.colors, (this.options ? this.options.colors : null), this.options1.colors),
        })
      },

      chartHeight() {
        return this.options2.height
      },

      baseClass() {
        return {
          'x4-line-chart': true,
        }
      },

      coinInst1({ state }) {
        return this.coin1 || state.values.coin1
      },

      coinInst2({ state }) {
        return this.coin2 || state.values.coin2
      },

      coinInst3({ state }) {
        return this.coin3 || state.values.coin3
      },

      coinInst4({ state }) {
        return this.coin4 || state.values.coin4
      },

      period({ getters }) {
        let coin = this.coinInst1 || this.coinInst2 || this.coinInst3 || this.coinInst4
        return getters['values/period']({ id: coin })
      },

      insideStyle() {
        return {
          height: this.options2.height + 'px',
        }
      },

      isLoaded({ state, getters }) {
        let result = true

        for (let index = 1; index <= 4; index++) {
          if (this['coinInst' + index]) {
            let id = this['coinInst' + index]

            if (!state.entities.history[id] || !state.entities.history[id][this.period]) {
              result = false
            }
          }
        }

        return result
      },

    }),


    methods: map.variables({

      ensureHistory({ dispatch }) {
        for (let index = 1; index <= 4; index++) {
          if (this['coinInst' + index]) {
            dispatch('entities/history/ensure', { id: this['coinInst' + index], period: this.period })
          }
        }
      },

    }),

  }

</script>
