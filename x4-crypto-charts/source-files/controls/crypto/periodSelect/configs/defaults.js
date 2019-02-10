export default async function(config, plugin, instance) {
  return {
    controls: {
      periodSelect: {
        visible: true,
        items: 'state.selections.period',
        itemValue: 'value',
        itemTitle: 'title',
      },
    },
  }
}
