export default async function(config, plugin, instance) {
  return {
    values: {
      fiat: {
        name: 'fiat',
        type: 'select',
        path: {
          mutation: 'FIAT_CHANGE',
          value: 'values.fiat',
          var: 'fiat',
        },
        icon: 'monetization_on',
        title: 'Fiat currency',
        options: {
          items: 'getters.controls/fiatSelect',
          itemValue: 'id',
          itemTitle: 'short',
          icon: 'monetization_on',
          label: 'Fiat currency',
        },
      },
    },
  }
}
