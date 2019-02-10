export default async function(plugin, instance) {
  return {
    controls: {
      loader: {
        name: 'loader',
        path: 'controls.loader',
        icon: 'sync',
        title: 'Initial loader',
      },
    },
  }
}
