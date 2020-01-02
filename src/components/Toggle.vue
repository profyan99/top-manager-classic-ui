<template>
  <div class="toggle">
    <label class="switch">
      <input type="checkbox" v-model="data">
      <span class="slider"></span>
    </label>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script>
  export default {
    name: 'Toggle',
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
    computed: {
      data: {
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

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .toggle
    display: flex
    align-items: center

    .label
      margin-left: base-unit(10)
      font-weight: bold
      font-size: base-unit(12)
      color: $light-grey
      text-transform: uppercase

  .switch
    position: relative
    display: inline-block
    width: base-unit(40)
    height: base-unit(24)

  .switch input
    opacity: 0
    width: 0
    height: 0

  .slider
    position: absolute
    cursor: pointer
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: $light-grey
    transition: .4s
    border-radius: base-unit(20)

  .slider:before
    position: absolute
    content: ""
    height: base-unit(16)
    width: base-unit(16)
    left: base-unit(4)
    bottom: base-unit(4)
    background-color: $dark-fg-main
    transition: .4s
    border-radius: 50%

  input:checked + .slider
    background-color: $red

  input:checked + .slider:before
    transform: translateX(base-unit(16))
</style>
