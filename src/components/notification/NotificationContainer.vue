<template>
  <div class="notifications-wrapper">
    <div class="app">
      <transition-group appear name="slide-right">
        <app-notification
          class="notification"
          v-for="notification in appNotifications"
          :key="notification.id"
          v-bind="notification"
        />
      </transition-group>
    </div>
    <div class="game">
      <transition appear name="slide-top">
        <game-notification
          class="notification"
          :key="currentGameNotification.id"
          v-bind="currentGameNotification"
          v-if="currentGameNotification"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppNotification from './AppNotification';
import GameNotification from './GameNotification';

export default {
  name: 'NotificationContainer',
  components: { GameNotification, AppNotification },
  computed: {
    ...mapGetters('notification', ['appNotifications', 'gameNotifications']),
    currentGameNotification() {
      return this.gameNotifications[0];
    },
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.notifications-wrapper
  z-index: 100
  position: fixed
  right: 0
  left: 0
  top: 0

  .app
    display: flex
    flex-direction: column
    position: absolute
    top: base-unit(40)
    right: 0

  .game
    display: flex
    flex-direction: column
    align-items: center
    position: absolute
    top: base-unit(40)
    right: 0
    left: 0

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

.slide-top-leave-active
  position: fixed

.slide-top-leave-active,
.slide-top-enter-active
  transition: all .5s

.slide-top-enter,
.slide-top-leave-to
  opacity: 0
  transform: translate(0, -100%)
</style>
