<template>
  <button @click="$emit('click')"
          class="app-button"
          :class="{ disabled: disabled }"
  >
    <icon v-if="icon" :icon="icon"/>
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script>
  export default {
    name: 'AppButton',
    props: {
      label: {
        type: String,
        default: null,
      },
      icon: {
        type: String,
        default: null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .app-button
    background-color: $blue
    cursor: pointer
    text-align: center
    color: $fg-main
    font-size: base-unit(12)
    border-radius: $base-border-radius
    padding: base-unit(10)
    box-sizing: border-box
    display: flex
    align-items: center
    outline: 0
    border: none
    justify-content: center
    text-transform: uppercase

    .disabled
      background-color: $light-grey

      &:hover
        opacity: 1

    &:hover
      opacity: 0.8
</style>
