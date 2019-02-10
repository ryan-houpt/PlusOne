export default async function(plugin, instance) {
  return {
    controls: {
      fiatSelect: {
        value: 'fiat',
        name: 'fiatSelect',
        path: 'controls.fiatSelect',
        icon: 'monetization_on',
        title: 'Fiat select',
        iconOptions: {
          default: 'monetization_on',
        },
        labelOptions: {
          default: 'Fiat currency',
        },
        exceptOptions: {
          items: 'getters.entities/fiats/all',
          itemValue: 'id',
          itemTitle: 'short',
          icon: 'monetization_on',
          label: 'Fiat currency',
        },
        topOptions: {
          items: 'getters.entities/fiats',
          itemValue: 'id',
          itemTitle: 'short',
          icon: 'monetization_on',
          label: 'Fiat currency',
        },
        valueOptions: {
          patterns: [
            { name: '[short]', desc: 'currency abbreviation' },
            { name: '[symbol]', desc: 'currency symbol' },
          ],
        },
      },
    },
  }
}
