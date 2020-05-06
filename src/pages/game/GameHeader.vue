<template>
  <div class="game-header">
    <div class="left-part">
      <span class="title">{{ gameData.name }}</span>
      <span class="company-name">
            Компания {{ currentPlayer.companyName }}
          </span>
    </div>
    <div class="spacer"></div>
    <app-button v-if="isRestartButtonShowing"
                label="Рестарт"
                @click="restartGame"
                class="header-button"/>
    <app-button icon="user-plus"
                @click="invitePlayer"
                class="header-button"/>
    <app-button icon="sign-out-alt"
                @click="exitFromRoom"
                class="header-button"/>
    <confirm-restart-game-modal v-if="isModalActive"
                                @close="isModalActive = false"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ConfirmRestartGameModal
    from '~/pages/game/modal/ConfirmRestartGameModal';

  import { GameState } from '~/utils';
  import AppButton from '~/components/AppButton';

  export default {
    name: 'GameHeader',
    components: {
      ConfirmRestartGameModal,
      AppButton,
    },
    data() {
      return {
        isModalActive: false,
      };
    },
    computed: {
      ...mapState('game', ['gameData', 'currentPlayer']),
      isRestartButtonShowing() {
        const { gameData, currentPlayer } = this;
        return gameData.state === GameState.END &&
          gameData.owner.userName === currentPlayer.userName;
      },
    },
    methods: {
      exitFromRoom() {
        this.$router.push({ name: 'rooms' });
      },
      invitePlayer() {

      },
      restartGame() {
        this.isModalActive = true;
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-header
    display: flex
    flex-direction: row
    align-items: flex-end
    min-height: base-unit(40)

    .spacer
      flex: 1

    .left-part
      display: flex
      align-items: baseline

      .company-name
        font-size: base-unit(20)
        font-weight: normal
        font-style: normal
        color: $dark-fg-main
        margin-left: base-unit(15)

    .header-button
      margin-left: base-unit(15)

  .title
    +title
</style>
