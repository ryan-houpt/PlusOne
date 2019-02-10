<template lang="pug">
  
  Icon.x4-transition(
    :icon="icon"
    :title="title"
    @click.native="click")

</template>


<script>

  import map from 'map'


  export default {

    components: map.components({
      Icon: require('Icon'),
    }),


    computed: map.variables({

      icon({ state }) {
        return state.builder.position === 'left'
          ? 'last_page'
          : 'first_page'
      },

      title({ state }) {
        return state.builder.position === 'left'
          ? 'Move right'
          : 'Move left'
      },

    }),


    methods: map.variables({

      click({ dispatch }) {
        dispatch('builder/position/change')
      },

    }),

  }

</script>
