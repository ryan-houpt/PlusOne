export default async function(config, plugin, instance) {
  return {
    values: {
      coin2: {
        name: 'coin2',
        type: 'select',
        path: {
          mutation: 'COIN2_CHANGE',
          value: 'values.coin2',
          var: 'coin2',
        },
        icon: 'copyright',
        title: 'Coin #2',
        options: {
          items: 'getters.entities/coins/all',
          itemValue: 'id',
          itemTemplate: '[rank]. [name] ([short])',
          icon: 'copyright',
          label: 'Coin name',
          hasNull: true,
        },
      },
    },
  }
}
