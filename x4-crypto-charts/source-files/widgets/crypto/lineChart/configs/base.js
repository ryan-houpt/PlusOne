export default async function(config, plugin, instance) {
  return {
    name: 'lineChart',
    title: 'Line Chart',
    contrOrder: [
      'lineChart',
      'fiatSelect',
      'periodSelect',
      'loader',
    ],
    valOrder: [
      'coin1',
      'coin2',
      'coin3',
      'coin4',
      'fiat',
      'period',
    ],
    multiValues: [
      
    ],
    hiddenValues: [
      
    ],
    scripts: [
      'momentjs',
      'chartjs',
    ],
    requests: [
      'coincapRates',
      'coincapAssets',
    ],
  }
}
