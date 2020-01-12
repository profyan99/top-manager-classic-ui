<template>
  <button @click="$emit('click')"
          class="app-button">
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
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .app-button
    background-color: $red
    cursor: pointer
    text-align: center
    color: $fg-main
    font-size: base-unit(14)
    border-radius: $base-border-radius
    padding: base-unit(10)
    box-sizing: border-box
    display: flex
    align-items: center
    outline: 0
    border: none
    justify-content: center

    &:hover
      opacity: 0.8
</style>
