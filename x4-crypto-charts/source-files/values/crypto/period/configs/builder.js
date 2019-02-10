export default async function(config, plugin, instance) {
  return {
    values: {
      period: {
        name: 'period',
        type: 'select',
        path: {
          mutation: 'PERIOD_CHANGE',
          value: 'defaults.period',
          var: 'period',
        },
        icon: 'access_time',
        title: 'Period of time',
        options: {
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
