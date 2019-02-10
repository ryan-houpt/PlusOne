export default async function(config, plugin, instance) {
  return {
    values: {
      coin3: {
        name: 'coin3',
        type: 'select',
        path: {
          mutation: 'COIN3_CHANGE',
          value: 'values.coin3',
          var: 'coin3',
        },
        icon: 'copyright',
        title: 'Coin #3',
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
