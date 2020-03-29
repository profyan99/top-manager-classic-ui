<template>
  <div class="">
    <label class="input-wrapper"
           :style="{ 'border-bottom-color': color }"
           :class="{ focused: focus }">
      <icon :icon="icon"
            v-if="icon"
            class="icon" :style="{ color: color }"/>
      <input :type="type"
             v-model="inputData"
             :placeholder="placeholder"
             @focus="focus = true"
             @keyup.enter="$emit('submit')"
             @blur="blur">
    </label>
    <span class="caption" v-show="caption">
      {{ caption }}
    </span>
    <span class="error" v-show="error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'app-input',
    props: {
      value: {
        required: true,
      },
      error: {
        type: Boolean,
        default: false,
      },
      errorMessage: {
        type: String,
        default: null,
      },
      caption: {
        type: String,
        default: null,
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
    computed: {
      inputData: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
    methods: {
      blur() {
        this.focus = false;
        this.$emit('blur');
      },
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
    padding-top: base-unit(6)
    padding-bottom: base-unit(10)
    width: 100%

  .error
    color: $red
    font-size: base-unit(12)
    font-weight: 300
    margin-top: base-unit(2)

  .caption
    color: $light-grey
    font-size: base-unit(14)
    font-weight: normal
    margin-top: base-unit(2)
</style>
