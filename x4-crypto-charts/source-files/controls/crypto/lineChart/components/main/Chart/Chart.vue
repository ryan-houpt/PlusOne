<template lang="pug">

  canvas(
    :style="baseStyle")

</template>


<script>

  import map from 'map'
  import wait from '~/common/bootstrap/wait'


  export default {

    props: ['coin1', 'coin2', 'coin3', 'coin4', 'period', 'options'],


    watch: {

      fiat() {
        setTimeout(() => {
          this.chartjs.options = this.config.options
          this.chartjs.update()
        })
      },

      datasets(value) {
        setTimeout(() => {
          this.chartjs.data.datasets = value
          this.chartjs.options = this.config.options
          this.chartjs.update()
        })
      },

      options: {
        handler() {
          setTimeout(() => {
            this.chartjs.options = this.config.options
            this.chartjs.update()
          })
        },
        deep: true,
      },

    },


    mounted() {
      wait(
        () => {
          return !!window.Chart && !!window.moment
        },
        () => {
          let Chart = window.Chart
          this.chartjs = new Chart(this.$el, this.config)
        },
      )
    },


    computed: map.variables({

      context() {
        return this.$el.getContext('2d')
      },

      height() {
        return this.options.height
      },

      fiat({ state }) {
        return state.entities.fiats[state.values.fiat]
      },

      baseStyle() {
        return {
          height: this.height + 'px',
          width: '100%',
        }
      },

      unit({ state }) {
        let unit = 'month'

        if (this.period <= 86400000) { // 1 day
          unit = 'hour'
        } else if (this.period > 86400000 && this.period <= 604800000) { // 7 days
          unit = 'day'
        } else if (this.period > 604800000 && this.period <= 2592000000) { // 30 days
          unit = 'day'
        } else if (this.period > 2592000000 && this.period <= 7776000000) { // 90 days
          unit = 'week'
        } else if (this.period > 7776000000 && this.period <= 15552000000) { // 180 days
          unit = 'week'
        } else if (this.period > 15552000000) { // 365 days
          unit = 'month'
        }

        return unit
      },

      datasets({ state, getters }) {
        let result = []

        for (let index = 1; index <= 4; index++) {
          if (!this['coin' + index]) {
            continue
          }

          let id = this['coin' + index]
          let coin = state.entities.coins[id]
          let fiat = state.entities.fiats[state.values.fiat]
          let history = state.entities.history[id][this.period] || []
          let divider = Math.round(history.length * this.options.line.smoothness / 500)

          if (divider === 0) {
            divider = 1
          }

          this.min = 1000000000
          this.max = 0

          let color = this.options.colors['coin' + index]

          result.push({
            xAxisID: 'x',
            yAxisID: 'y',
            fill: this.options.line.fill,
            borderWidth: this.options.line.thickness,
            borderColor: this.options.line.colorize
              ? color
              : getters['helpers/colors/rgba/opacity']({ rgba: this.options.colors.primary, opacity: .24 }),
            backgroundColor: this.options.line.colorize
              ? getters['helpers/colors/rgba/opacity']({ rgba: color, opacity: .24 })
              : getters['helpers/colors/rgba/opacity']({ rgba: this.options.colors.primary, opacity: .08 }),
            label: this.options.legend.visible
              ? getters['helpers/items/format/template'](null, {
                  template: this.options.legend.template,
                  patterns: {
                    coin: coin.short,
                    fiat: fiat.short,
                  },
                  notags: true,
                })
              : '',
            data: history
              .filter((point, index) => {
                return index % divider === 0
              })
              .map(point => {
                if (point.price > this.max) {
                  this.max = point.price
                }

                if (point.price < this.min) {
                  this.min = point.price
                }

                return {
                  x: point.time,
                  y: point.price,
                }
              }),
          })
        }

        return result
      },

      config({ state, getters }) {
        let self = this

        let formatters = ['price', 'number', 'template', 'fiat']
        let formatOptions = Object.assign({ notags: true }, this.options.format)
        let formatExtra = { fiat: this.fiat }

        let suggestedMax = this.max + (this.max - this.min) / 20
        let suggestedMin = this.min - (this.max - this.min) / 20

        if (suggestedMin < 0) {
          suggestedMin = 0
        }

        let drawing = false
        let x, y = 0

        return {
          type: 'line',
          data: {
            datasets: this.datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: false,
            },
            animation: {
              duration: 0,
            },
            legend: this.options.legend.visible
              ? {
                  labels: {
                    padding: 12,
                    fontFamily: '\'Roboto\',sans-serif',
                    fontColor: this.options.colors.primary,
                    fontSize: 14,
                  },
                }
              : false,
            tooltips: this.options.tooltip.visible
              ? {
                  mode: 'index',
                  intersect: false,
                  position: 'nearest',
                  displayColors: false,
                  bodyFontFamily: '\'Roboto\',sans-serif',
                  footerFontFamily: '\'Roboto\',sans-serif',
                  bodyFontSize: 13,
                  footerFontSize: 10,
                  bodyFontStyle: '500',
                  footerFontStyle: '400',
                  yPadding: 12,
                  xPadding: 24,
                  callbacks: {
                    title(items, data) {
                      return ''
                    },
                    label(item, data) {
                      let price = data.datasets[item.datasetIndex].data[item.index].y

                      let id = self['coin' + (item.datasetIndex + 1)]
                      let coin = state.entities.coins[id]

                      formatters.forEach(formatter => {
                        price = getters['helpers/items/format/' + formatter](price, formatOptions, {}, formatExtra, price)
                      })

                      return price + ' (' + coin.short + ')'
                    },
                    footer(items, data) {
                      if (!self.options.tooltip.date) {
                        return ''
                      }

                      let time = data.datasets[items[0].datasetIndex].data[items[0].index].x
                      let date = time.toDateString().split(' ')

                      return date[1] + ' ' + date[2] + ', ' + ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2)
                    },
                  },
                }
              : false,
            scales: {
              xAxes: [{
                id: 'x',
                type: 'time',
                display: this.options.scales.visible && this.options.scales.horizontal,
                time: {
                  unit: this.unit,
                },
                gridLines: {
                  drawBorder: false,
                  tickMarkLength: 8,
                  borderDash: [4, 2],
                  color: getters['helpers/colors/rgba/opacity']({ rgba: this.options.colors.primary, opacity: .12 }),
                },
                ticks: {
                  padding: 4,
                  maxRotation: 0,
                  fontFamily: '\'Roboto\',sans-serif',
                  fontColor: this.options.colors.primary,
                  fontSize: 12,
                },
              }],
              yAxes: [{
                id: 'y',
                type: 'linear',
                position: 'right',
                display: this.options.scales.visible && this.options.scales.vertical,
                gridLines: {
                  drawBorder: false,
                  drawTicks: false,
                  borderDash: [4, 2],
                  color: getters['helpers/colors/rgba/opacity']({ rgba: this.options.colors.primary, opacity: .12 }),
                },
                ticks: {
                  padding: 8,
                  suggestedMax,
                  suggestedMin,
                  fontFamily: '\'Roboto\',sans-serif',
                  fontColor: this.options.colors.primary,
                  fontSize: 12,
                  callback(price) {
                    if (!price || price < suggestedMin) {
                      return ''
                    }

                    formatters.forEach(formatter => {
                      price = getters['helpers/items/format/' + formatter](price, formatOptions, {}, formatExtra, price)
                    })

                    return price
                  },
                },
              }],
            },
          },
          plugins: [{

            afterEvent(chart, event) {
              x = Math.round(event.x)
              y = Math.round(event.y)

              setTimeout(() => {
                if (!drawing) {
                  chart.render({ duration: 0 })
                }
              }, 1)
            },

            afterDatasetsDraw(chart) {
              if (!self.options.crosshair.visible) {
                return
              }

              if (x < chart.chartArea.left || x > chart.chartArea.right) {
                return
              }

              if (y < chart.chartArea.top || y > chart.chartArea.bottom) {
                return
              }

              let canvas = self.$el
              let context = self.context

              context.beginPath()
              context.lineWidth = 1

              if (self.options.crosshair.dotted) {
                context.setLineDash([2, 2])
              } else {
                context.setLineDash([])
              }

              if (self.options.crosshair.vertical) {
                context.moveTo(x + .5, .5)
                context.lineTo(x + .5, canvas.scrollHeight + .5)
              }

              if (self.options.crosshair.horizontal) {
                context.moveTo(.5, y + .5)
                context.lineTo(canvas.scrollWidth + .5, y + .5)
              }

              context.strokeStyle = self.options.colors.crosshair
              context.stroke()
              context.closePath()
            },

            beforeRender(chart) {
              drawing = true
            },

            afterRender(chart) {
              drawing = false
            },

          }],
        }
      },

    }),

  }

</script>
