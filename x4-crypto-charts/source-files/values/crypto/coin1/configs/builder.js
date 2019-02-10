export default async function(config, plugin, instance) {
  return {
    values: {
      coin1: {
        name: 'coin1',
        type: 'select',
        path: {
          mutation: 'COIN1_CHANGE',
          value: 'values.coin1',
          var: 'coin1',
        },
        icon: 'copyright',
        title: 'Coin #1',
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
