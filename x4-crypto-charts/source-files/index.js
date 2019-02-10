require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [],
})

require('@babel/polyfill')


let argv = require('yargs').argv
let entry = argv.entry || argv.env.entry

let warn = console.warn
console.warn = function(message) {
  if (message.match(/The \.jade extension is deprecated/)) return
  return warn.apply(this, arguments)
}

require('./' + entry).default()
