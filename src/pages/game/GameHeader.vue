<template>
  <div class="game-header">
    <div>
      <span class="game-header-title">Состояние</span>
      <span class="game-header-value">{{ currentState }}</span>
    </div>
    <div>
      <span class="game-header-title">Квартал</span>
      <span class="game-header-value">{{ gameData.currentPeriod }}</span>
    </div>
    <div>
      <span class="game-header-title">Игроки</span>
      <span class="game-header-value">{{ gameData.currentPlayers }}</span>
    </div>
    <div>
      <span class="game-header-title">Время</span>
      <span class="game-header-value">{{ currentTime }}</span>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { convertRoomState, convertSecondsToMinutes } from '~/helpers/room';

  export default {
    name: 'GameHeader',
    computed: {
      ...mapState('game', [
        'currentSecond',
        'gameData',
        'currentPlayer',
      ]),
      currentState() {
        return convertRoomState(this.gameData.state, this.currentPlayer.state);
      },
      currentTime() {
        const { currentSecond, gameData } = this;
        const timeLeft = gameData.periodDuration - currentSecond;
        return convertSecondsToMinutes(timeLeft < 0 ? 0 : timeLeft);
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
    margin-top: base-unit(10)

    &-title
      margin-right: base-unit(5)
      font-size: base-unit(16)
      font-weight: bold
      font-style: normal
      color: $bg-main

    &-value
      +black-frame

</style>
