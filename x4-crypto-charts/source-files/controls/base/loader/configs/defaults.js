export default async function(config, plugin, instance) {
  return {
    controls: {
      loader: {
        visible: true,
        colorize: true,
        size: 200,
      },
    },
  }
}
