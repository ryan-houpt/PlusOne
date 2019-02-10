export default async function(plugin, instance) {
  return {
    colors: [
      { name: 'coin1', title: 'Coin #1<br/>Color' },
      { name: 'coin2', title: 'Coin #2<br/>Color' },
      { name: 'coin3', title: 'Coin #3<br/>Color' },
      { name: 'coin4', title: 'Coin #4<br/>Color' },
      { name: 'crosshair', title: 'Crosshair<br/>Color' },
    ],
    controls: {
      lineChart: {
        path: 'controls.lineChart',
        name: 'lineChart',
        icon: 'show_chart',
        title: 'Chart block',
        heightOptions: {
          icon: 'swap_vert',
          label: 'Chart height',
          min: 0,
          step: 4,
        },
        thicknessOptions: {
          icon: 'line_weight',
          label: 'Thickness',
          min: 1,
          max: 10,
          step: 1,
        },
        smoothnessOptions: {
          icon: 'line_weight',
          label: 'Smoothness',
          min: 1,
          max: 20,
          step: 1,
        },
        formatOptions: {
          label: 'Price template',
          patterns: [
            { name: '[value]', desc: 'numeric value' },
            { name: '[symbol]', desc: 'currency symbol' },
            { name: '[short]', desc: 'currency abbreviation (only if the currency symbol does not exist)' },
          ],
        },
        legendOptions: {
          label: 'Legend template',
          patterns: [
            { name: '[coin]', desc: 'coin abbreviation' },
            { name: '[fiat]', desc: 'fiat abbreviation' },
          ],
        },
        watermarkOptions: {
          patterns: [
            { name: '[fiat]', desc: 'fiat abbreviation' },
            { name: '[coin1]', desc: 'coin1 abbreviation' },
            { name: '[coin2]', desc: 'coin2 abbreviation' },
            { name: '[coin3]', desc: 'coin3 abbreviation' },
            { name: '[coin4]', desc: 'coin4 abbreviation' },
          ],
        },
        colorsOptions: {
          presets: [
            'primary',
            'coin1',
            'coin2',
            'coin3',
            'coin4',
            'crosshair',
          ],
        },
      },
    },
  }
}
