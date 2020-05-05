<template>
  <div class="app-input">
    <label class="input-wrapper"
           :class="textInputClasses">
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
      icon: {
        type: String,
        default: null,
      },
      color: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        focus: false,
      };
    },
    computed: {
      textInputClasses() {
        return {
          [this.color]: Boolean(this.color),
          focused: this.focus,
        };
      },
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

  .app-input
    display: flex
    flex: 1
    width: 100%
    flex-direction: column

  .input-wrapper
    display: flex
    align-items: center
    border-bottom-color: $dark-fg-main
    border-bottom-style: solid
    border-bottom-width: base-unit(2)

    &.grey
      border-bottom-color: $light-grey

    &.focused
      border-bottom-color: $red

  .icon
    margin-right: base-unit(5)

  input
    background-color: transparent
    border: 0
    outline: 0
    font-weight: lighter
    font-size: base-unit(14)
    +sub-font
    color: $dark-fg-main
    padding-top: base-unit(6)
    padding-bottom: base-unit(6)
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
