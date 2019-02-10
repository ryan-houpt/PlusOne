export default async function(config, plugin, instance) {
  return {
    values: {
      coin4: {
        name: 'coin4',
        type: 'select',
        path: {
          mutation: 'COIN4_CHANGE',
          value: 'values.coin4',
          var: 'coin4',
        },
        icon: 'copyright',
        title: 'Coin #4',
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
