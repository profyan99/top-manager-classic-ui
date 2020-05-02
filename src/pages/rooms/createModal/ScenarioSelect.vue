<template>
  <v-select
      v-model="selectedScenario"
      class="scenario-select"
      placeholder="Выберите сценарий"
      label="name"
      :clearable="false"
      :options="options">
  </v-select>
</template>

<script>
  export default {
    name: 'ScenarioSelect',
    props: {
      options: {
        type: Array,
        required: true,
      },
      value: {
        type: Object,
        required: true,
      },
    },
    computed: {
      selectedScenario: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
  };
</script>

<style lang="sass">
  @import "~/styles/styleguide.sass"

  $vs-border-width: base-unit(2)
  $vs-border-radius: $base-border-radius
  $vs-border-color: $light-grey

  $vs-state-active-bg: $blue
  $vs-controls-color: $light-grey

  @import "~vue-select/src/scss/vue-select.scss"

  .scenario-select
    .vs__dropdown-menu
      background-color: $light-grey

    .vs__selected
      color: $dark-fg-main
</style>
