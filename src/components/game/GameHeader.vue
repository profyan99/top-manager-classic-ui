<template>
  <div class="game-header">
    <span>{{ roomData.name }}</span>
    <span>{{ currentState }}</span>
    <span>Квартал: {{ roomData.currentRound }}</span>
    <span>Время: {{ currentTime }}</span>
    <app-button label="Выход" @click="exitFromRoom"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import AppButton from '~/components/AppButton';
  import { convertRoomState, convertSecondsToMinutes } from '~/helpers/room';

  export default {
    name: 'GameHeader',
    components: { AppButton },
    computed: {
      ...mapState('game', ['roomData']),
      currentState() {
        return convertRoomState(this.roomData.currentState);
      },
      currentTime() {
        return convertSecondsToMinutes(this.roomData.currentSecond);
      },
    },
    methods: {
      exitFromRoom() {

      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-header
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    min-height: base-unit(40)
</style>
