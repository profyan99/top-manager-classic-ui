<template>
  <div class="notifications-wrapper">
    <transition-group appear name="slide-right">
      <app-notification
        class="notification"
        v-for="notification in notifications"
        :key="notification.id"
        v-bind="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppNotification from '~/components/notification/AppNotification';

export default {
  name: 'NotificationContainer',
  components: { AppNotification },
  computed: {
    ...mapState('notification', ['notifications']),
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.notifications-wrapper
  z-index: 100
  position: fixed
  right: 0
  top: base-unit(40)
  display: flex
  flex-direction: column

.notification
  margin: base-unit(5) 0

  &:last-child
    margin-bottom: 0

  &:first-child
    margin-top: 0

.slide-right-leave-active
  position: fixed

.slide-right-leave-active,
.slide-right-enter-active
  transition: all .5s

.slide-right-enter,
.slide-right-leave-to
  opacity: 0
  transform: translate(100%, 0)

.slide-right-move
  transition: all .5s
</style>
