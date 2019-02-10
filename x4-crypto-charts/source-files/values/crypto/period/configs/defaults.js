export default async function(config, plugin, instance) {
  return {
    selections: {
      period: [
        { value: 63072000000, title: '2 years' },
        { value: 31536000000, title: '365 days' },
        { value: 15552000000, title: '180 days' },
        { value: 7776000000, title: '90 days' },
        { value: 2592000000, title: '30 days' },
        { value: 604800000, title: '7 days' },
        { value: 86400000, title: '24 hours' },
      ],
    },
    values: {
      period: 31536000000,
    },
  }
}
