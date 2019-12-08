<template>
  <label class="input-wrapper"
         :style="{ 'border-bottom-color': color }"
         :class="{ focused: focus }">
    <icon :icon="icon"
          v-if="icon"
          class="icon" :style="{ color: color }"></icon>
    <input :type="type"
           :value="value"
           :placeholder="placeholder"
           @focus="focus = true"
           @blur="focus = false"
           @keyup.enter="$emit('submit')"
           @input="$emit('input', $event.target.value)">
  </label>
</template>

<script>
  export default {
    name: 'app-input',
    props: {
      value: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'text',
      },
      color: {
        type: String,
        default: '#D8D8D8',
      },
      icon: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        focus: false,
      };
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .input-wrapper
    display: flex
    align-items: center
    border-bottom-style: solid
    border-bottom-width: base-unit(2)

  .focused
    border-bottom-color: $red !important

  .icon
    margin-right: base-unit(5)

  input
    background-color: transparent
    border: 0
    outline: 0
    font-weight: lighter
    font-size: base-unit(14)
    +sub-font
    color: $fg-main
    padding: base-unit(10) 0
    width: 100%
</style>
