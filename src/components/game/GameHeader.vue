<template>
  <div class="game-header">
    <span>Состояние: {{ currentState }}</span>
    <span>Квартал: {{ gameData.currentRound }}</span>
    <span>Время: {{ currentTime }}</span>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { convertRoomState, convertSecondsToMinutes } from '~/helpers/room';

  export default {
    name: 'GameHeader',
    computed: {
      ...mapState('game', ['gameData']),
      currentState() {
        return convertRoomState(this.gameData.state);
      },
      currentTime() {
        const { gameData: { currentSecond, prepareSecond, state } } = this;
        return convertSecondsToMinutes(
          state === 'PREPARE' ? prepareSecond : currentSecond
        );
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
    background-color: $red
    border-radius: $base-border-radius
    color: $bg-main
    min-height: base-unit(40)
    padding: 0 base-unit(20)
    margin-top: base-unit(15)
</style>
