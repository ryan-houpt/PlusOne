let x4wp = window.x4wp
let globName = 'X4WP.GLOB_NAME'
let x4plugin = window[globName]
let x4builder = x4wp.builders[globName]


export default () => ({

  name: 'builder/presets',


  getters: {

    themes(state) {
      return ({ changeName, allowedThemes, allowedSubthemes }) => {
        let presets = []

        x4builder.schema[state.type].themes.forEach(theme => {
          if (allowedThemes.indexOf(theme.name) !== -1) {
            let ptheme = Object.assign({}, theme, { subthemes: [] })

            theme.subthemes.forEach(subtheme => {
              if (allowedSubthemes[theme.name].indexOf(subtheme.name) !== -1) {
                let psubtheme = Object.assign({}, subtheme, { changes: {} })
                let changes = x4plugin.defaults[state.type].changes

                if (changes[theme.name] && changes[theme.name][subtheme.name]) {
                  if (changeName === true) {
                    psubtheme.changes = changes[theme.name][subtheme.name]
                  } else if (changes[theme.name][subtheme.name][changeName]) {
                    psubtheme.changes[changeName] = changes[theme.name][subtheme.name][changeName]
                  }
                }

                ptheme.subthemes.push(psubtheme)
              }
            })

            presets.push(ptheme)
          }
        })

        return presets
      }
    },


    colors(state) {
      return ({ allowedColors, path }) => {
        let presets = x4builder.schema[state.type].colors.filter(color => {
          return allowedColors.indexOf(color.name) !== -1
        })

        if (path !== undefined) {
          presets = presets.map(color => {
            return Object.assign({ path }, color)
          })
        }

        return presets
      }
    },

  },

})
