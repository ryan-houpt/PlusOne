export default async function(plugin, instance) {
  return {
    controls: {
      periodSelect: {
        value: 'period',
        name: 'periodSelect',
        path: 'controls.periodSelect',
        icon: 'access_time',
        title: 'Period select',
        itemsOptions: {
          path: 'selections.period',
          items: 'state.selections.period',
          itemValue: 'value',
          itemTitle: 'title',
          icon: 'access_time',
          label: 'Period of time',
        },
      },
    },
  }
}
