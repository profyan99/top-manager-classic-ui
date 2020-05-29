<template>
  <div :key="id" class="notification">
    <span class="content">
      {{ text }}
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'GameNotification',
  props: {
    id: {
      type: Number,
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
    };
  },
  methods: {
    ...mapActions('notification', ['removeNotification']),
  },
  mounted() {
    this.timerId = setTimeout(() => {
      this.removeNotification(this.id);
      this.timerId = null;
    }, this.timeout);
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.notification
  max-width: base-unit(250)
  min-height: base-unit(30)
  height: fit-content
  max-height: base-unit(200)
  background-color: $dark-fg-main
  border-radius: $base-border-radius
  padding: base-unit(4)
  display: flex
  cursor: pointer
  opacity: 1

  &:hover
    opacity: 0.9

  .content
    flex: 1
    display: flex
    align-items: center
    font-weight: 400
    font-size: base-unit(14)
    color: $grey
    overflow: hidden
    padding: base-unit(10)
</style>
