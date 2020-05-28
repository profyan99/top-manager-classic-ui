<template>
  <button
    @click="handleClick"
    class="app-button"
    :class="{ disabled: disabled }"
  >
    <icon v-if="icon" :icon="icon" />
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
  methods: {
    handleClick() {
      if (this.disabled) {
        return;
      }

      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.app-button
  background-color: $light-grey
  cursor: pointer
  text-align: center
  color: $fg-main
  font-size: base-unit(14)
  border-radius: $base-border-radius
  padding: base-unit(8)
  box-sizing: border-box
  display: flex
  align-items: center
  outline: 0
  border: none
  justify-content: center

  &.disabled
    background-color: $light-grey
    color: $grey
    cursor: auto

    &:hover
      opacity: 1

  &:hover
    opacity: 0.8
</style>
