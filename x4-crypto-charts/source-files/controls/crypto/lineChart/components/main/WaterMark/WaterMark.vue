<template lang="pug">

  DIV(
    v-if="options1.visible"
    :class="baseClass")

    div.x4-value(
      v-html="value")

    Style(
      :colors="options.colors")
      include ./WaterMark.sass

</template>


<script>

  import map from 'map'


  export default {

    props: ['coin1', 'coin2', 'coin3', 'coin4', 'options'],


    components: map.components({
      DIV: require('DIV'),
      Style: require('Style'),
    }),


    data() {
      return {
        fontSize: 0,
      }
    },


    created() {
      window.addEventListener('resize', this.resize)
    },


    mounted() {
      this.resize()
    },


    destroyed() {
      window.removeEventListener('resize', this.resize)
    },


    computed: map.variables({

      options1({ state }) {
        return state.controls.lineChart.watermark
      },

      fiat({ state }) {
        return state.entities.fiats[state.values.fiat]
      },

      baseClass() {
        return {
          'x4-watermark': true,
        }
      },

      value({ state, getters }) {
        let coins = state.entities.coins

        let patterns = {
          fiat: this.fiat.short,
        }

        for (let index = 1; index <= 4; index++) {
          patterns['coin' + index] = this['coin' + index]
            ? state.entities.coins[this['coin' + index]].short
            : ''
        }

        return getters['helpers/items/format/template'](null, {
          template: this.options1.template,
          patterns,
        })
      },

    }),


    methods: map.variables({

      resize() {
        let width = this.$el.parentNode.offsetWidth

        this.fontSize = width > 576
          ? width > 768
            ? width > 992
              ? 160
              : 128
            : 96
          : 0
      },

    }),

  }

</script>
