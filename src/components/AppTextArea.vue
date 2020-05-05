<template>
  <label class="textarea-wrapper"
         :class="textAreaClasses">
    <textarea ref="textarea"
              :value="value"
              class="textarea"
              :placeholder="placeholder"
              rows="1"
              :maxlength="maxLength"
              v-on:keydown.enter="onEnterPressed"
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur">
    </textarea>
  </label>
</template>

<script>
  export default {
    name: 'AppTextArea',
    props: {
      value: {
        type: String,
      },
      placeholder: {
        type: String,
        default: '',
      },
      maxLength: {
        type: Number,
        default: 128,
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
      textAreaClasses() {
        return {
          [this.color]: Boolean(this.color),
          focused: this.focus,
        };
      },
    },
    methods: {
      onInput(event) {
        this.$emit('input', event.target.value);
      },
      onEnterPressed() {
        this.$emit('submit');
      },
      onFocus() {
        this.focus = true;
      },
      onBlur() {
        this.focus = false;
        this.$emit('blur');
      },
    },
    watch: {
      value() {
        this.$nextTick(() => {
          this.$refs.textarea.style.height = 'auto';
          this.$refs.textarea.style.height =
            `${this.$refs.textarea.scrollHeight}px`;
        });
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.textarea.style.height =
          `${this.$refs.textarea.scrollHeight}px`;
      });
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .textarea
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
    resize: none

    &-wrapper
      display: flex
      width: 100%
      border-bottom-color: $dark-fg-main
      border-bottom-style: solid
      border-bottom-width: base-unit(2)

      &.grey
        border-bottom-color: $light-grey

      &.focused
        border-bottom-color: $red

    &::placeholder
      color: inherit
      font-weight: inherit
      font-size: inherit

</style>
