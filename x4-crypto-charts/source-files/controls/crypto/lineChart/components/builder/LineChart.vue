<template lang="pug">

  BBSection(
    :path="path"
    :visibility="true"
    :visible="values.visible"
    :icon="schema.icon"
    :title="schema.title")

    BBOption(
      title="Base options")

      BOActions(
        :path="[path + '.height', path + '.line']")

      BOSwitchbox(
        :value="values.line.colorize"
        :options="{ label: 'Colorize chart' }"
        :path="path + '.line.colorize'")

      BOSwitchbox(
        :value="values.line.fill"
        :options="{ label: 'Fill background' }"
        :path="path + '.line.fill'")

      BOInput.x4-margin-top(
        type="number"
        :value="values.height"
        :options="schema.heightOptions"
        :path="path + '.height'")

      BOInput.x4-margin-top(
        type="number"
        :value="values.line.thickness"
        :options="schema.thicknessOptions"
        :path="path + '.line.thickness'")

      BOInput.x4-margin-top(
        type="number"
        :value="values.line.smoothness"
        :options="schema.smoothnessOptions"
        :path="path + '.line.smoothness'")

    BBOption(
      title="Price format")

      BOActions(
        :path="path + '.format'")

      BOTemplate(
        :value="values.format.template"
        :options="schema.formatOptions"
        :path="path + '.format.template'")

      BONumberPrecision.x4-margin-top(
        :path="path + '.format.precision'"
        :value="values.format.precision")

      BONumberSeparator.x4-margin-top(
        :path="path + '.format.separator'"
        :value="values.format.separator")

      BONumberFactor.x4-margin-top(
        :path="path + '.format.factor'"
        :value="values.format.factor")

    BBOption(
      title="Legend")

      BOActions(
        :path="path + '.legend'")

      BOSwitchbox(
        :value="values.legend.visible"
        :options="{ label: 'Show legend' }"
        :path="path + '.legend.visible'")

      BOTemplate.x4-margin-top(
        :value="values.legend.template"
        :options="schema.legendOptions"
        :path="path + '.legend.template'")

    BBOption(
      title="Scales")

      BOActions(
        :path="path + '.scales'")

      BOSwitchbox(
        :value="values.scales.visible"
        :options="{ label: 'Show scales' }"
        :path="path + '.scales.visible'")

      BOSwitchbox(
        :value="values.scales.horizontal"
        :options="{ label: 'Show horizontal' }"
        :path="path + '.scales.horizontal'")

      BOSwitchbox(
        :value="values.scales.vertical"
        :options="{ label: 'Show vertical' }"
        :path="path + '.scales.vertical'")

    BBOption(
      title="Tooltip")

      BOActions(
        :path="path + '.tooltip'")

      BOSwitchbox(
        :value="values.tooltip.visible"
        :options="{ label: 'Show tooltip' }"
        :path="path + '.tooltip.visible'")

      BOSwitchbox(
        :value="values.tooltip.date"
        :options="{ label: 'Show date & time' }"
        :path="path + '.tooltip.date'")

    BBOption(
      title="Crosshair")

      BOActions(
        :path="path + '.crosshair'")

      BOSwitchbox(
        :value="values.crosshair.visible"
        :options="{ label: 'Show crosshair' }"
        :path="path + '.crosshair.visible'")

      BOSwitchbox(
        :value="values.crosshair.horizontal"
        :options="{ label: 'Show horizontal' }"
        :path="path + '.crosshair.horizontal'")

      BOSwitchbox(
        :value="values.crosshair.vertical"
        :options="{ label: 'Show vertical' }"
        :path="path + '.crosshair.vertical'")

      BOSwitchbox(
        :value="values.crosshair.dotted"
        :options="{ label: 'Dotted line' }"
        :path="path + '.crosshair.dotted'")

    BBOption(
      title="Watermark")

      BOActions(
        :path="path + '.watermark'")

      BOSwitchbox(
        :value="values.watermark.visible"
        :options="{ label: 'Show watermark' }"
        :path="path + '.watermark.visible'")

      BOTemplate.x4-margin-top(
        :value="values.watermark.template"
        :options="schema.watermarkOptions"
        :path="path + '.watermark.template'")

    BBOption(
      title="Loader")

      BOActions(
        :path="path + '.loader'")

      BOSwitchbox(
        :value="values.loader.visible"
        :options="{ label: 'Show loader' }"
        :path="path + '.loader.visible'")

      BOSwitchbox(
        :value="values.loader.colorize"
        :options="{ label: 'Colorize loader' }"
        :path="path + '.loader.colorize'")

    BBOption(
      title="Colors")

      BOActions(
        :path="path + '.colors'")

      BOColors(
        :value="colorsValue"
        :colors="colorPresets"
        :path="path + '.colors'"
        :decline="declineColor")

</template>


<script>

  import map from 'map'


  export default {

    props: ['path', 'values', 'defaults', 'schema', 'vvalue', 'vschema'],


    components: map.components({
      BBSection: require('BBSection'),
      BBOption: require('BBOption'),
      BOActions: require('BOActions'),
      BOInput: require('BOInput'),
      BOSwitchbox: require('BOSwitchbox'),
      BOTemplate: require('BOTemplate'),
      BONumberPrecision: require('BONumberPrecision'),
      BONumberSeparator: require('BONumberSeparator'),
      BONumberFactor: require('BONumberFactor'),
      BOColors: require('BOColors'),
    }),


    computed: map.variables({

      colorsValue({ state }) {
        return Object.assign({}, state.colors, this.values.colors)
      },

      colorPresets({ getters }) {
        return getters['builder/presets/colors']({
          allowedColors: this.schema.colorsOptions.presets,
        })
      },

      declineColor({ state }) {
        return ({ name, value }) => {
          return value === state.colors[name]
        }
      },

    }),

  }

</script>
