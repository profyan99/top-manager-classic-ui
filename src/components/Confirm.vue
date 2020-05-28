<template>
  <div class="wrapper">
    <div class="bg"></div>
    <div class="confirm" @keyup.enter="resolve">
      <span class="content">
        {{ content }}
      </span>
      <div class="actions">
        <app-button :label="resolveLabel" @click="resolve" />
        <app-button :label="rejectLabel" @click="reject" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton';

export default {
  name: 'Confirm',
  components: { AppButton },
  props: {
    content: {
      type: String,
      required: true,
    },
    resolveLabel: {
      type: String,
      default: 'Ок',
    },
    rejectLabel: {
      type: String,
      default: 'Отмена',
    },
  },
  created() {
    window.addEventListener('click', this.forbidClickOutside, true);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.forbidClickOutside, true);
  },
  methods: {
    resolve() {
      this.$emit('resolve');
    },
    reject() {
      this.$emit('reject');
    },
    forbidClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        e.stopPropagation();
      }
    },
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.wrapper
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0

.bg
  width: 100%
  height: 100%
  background-color: black
  opacity: 0.4

.confirm
  max-width: base-unit(500)
  min-width: base-unit(300)
  width: fit-content
  max-height: base-unit(300)
  min-height: base-unit(100)
  height: fit-content
  box-sizing: border-box
  border-bottom-left-radius: $base-border-radius
  border-bottom-right-radius: $base-border-radius
  background-color: $grey
  display: flex
  flex-direction: column
  position: absolute
  margin: auto auto
  left: 0
  right: 0
  top: 0
  z-index: 10

  .content
    flex: 1
    display: flex
    flex-direction: column
    width: 100%
    padding: base-unit(16)
    box-sizing: border-box
    color: $fg-main
    font-size: base-unit(14)
    font-weight: 400
    +sub-font

  .actions
    display: flex
    padding: base-unit(16)
    justify-content: flex-end

    button
      margin-left: base-unit(15)
</style>
