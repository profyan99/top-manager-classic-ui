<template>
  <div
    :key="id"
    class="notification"
    @click="remove"
    @mouseover="setMouseOver(true)"
    @mouseleave="setMouseOver(false)"
  >
    <div class="icon-wrapper" :class="{ error: isError }">
      <icon size="lg" :icon="icon" class="icon" :class="{ error: isError }" />
    </div>
    <span class="content">
      {{ text }}
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppNotification',
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 4000,
    },
  },
  data() {
    return {
      timerId: null,
      isMouseOver: false,
    };
  },
  computed: {
    isError() {
      return this.type === 'ERROR';
    },
    icon() {
      return this.isError ? 'exclamation' : 'info';
    },
  },
  methods: {
    ...mapActions('notification', ['removeNotification']),
    setMouseOver(value) {
      this.isMouseOver = value;

      if (!value && !this.timerId) {
        this.remove();
      }
    },
    remove() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.removeNotification(this.id);
      this.timerId = null;
    },
  },
  mounted() {
    this.timerId = setTimeout(() => {
      if (!this.isMouseOver) {
        this.removeNotification(this.id);
      }

      this.timerId = null;
    }, this.timeout);
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.notification
  max-width: base-unit(250)
  min-height: base-unit(50)
  height: fit-content
  max-height: base-unit(200)
  background-color: $dark-fg-main
  border-bottom-left-radius: $base-border-radius
  border-top-left-radius: $base-border-radius
  display: flex
  cursor: pointer
  opacity: 1
  padding: base-unit(4)

  &:hover
    opacity: 0.9

  .icon-wrapper
    display: flex
    justify-content: center
    align-items: center
    width: base-unit(50)
    background-color: $light-light-grey
    border-radius: $base-border-radius

    &.error
      background-color: $red

  .content
    flex: 1
    display: flex
    align-items: center
    font-weight: 400
    font-size: base-unit(14)
    color: $grey
    overflow: hidden
    padding: base-unit(10)

.icon
  color: $light-grey

  &.error
    color: $dark-red

</style>
