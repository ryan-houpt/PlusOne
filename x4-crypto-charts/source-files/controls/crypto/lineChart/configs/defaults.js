export default async function(config, plugin, instance) {
  return {
    colors: {
      coin1: 'rgba(0,188,212,1)',
      coin2: 'rgba(0,188,212,1)',
      coin3: 'rgba(0,188,212,1)',
      coin4: 'rgba(0,188,212,1)',
      crosshair: 'rgba(244,67,54,1)',
    },
    controls: {
      lineChart: {
        visible: true,
        height: 400,
        format: {
          template: '[symbol][value] [short]',
          factor: '',
          separator: ',',
          precision: 'auto',
        },
        line: {
          fill: true,
          colorize: true,
          thickness: 2,
          smoothness: 4,
        },
        legend: {
          visible: false,
          template: '[coin]/[fiat]',
        },
        scales: {
          visible: true,
          horizontal: true,
          vertical: true,
        },
        tooltip: {
          visible: true,
          date: true,
        },
        crosshair: {
          visible: true,
          horizontal: true,
          vertical: true,
          dotted: false,
        },
        watermark: {
          visible: true,
          template: '[coin1]/[fiat]',
        },
        loader: {
          visible: true,
          colorize: true,
        },
      },
    },
  }
}
