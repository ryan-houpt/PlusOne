export default async function(config, plugin, instance) {
  return {
    controls: {
      fiatSelect: {
        visible: true,
        icon: 'monetization_on',
        label: 'Fiat currency',
        items: 'getters.controls/fiatSelect',
        itemValue: 'id',
        itemTemplate: '[short]',
        top: [
          'united-states-dollar',
          'euro',
          'japanese-yen',
          'british-pound-sterling',
          'bitcoin',
          'ethereum',
        ],
      },
    },
  }
}
