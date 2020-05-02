<template>
  <span v-if="!gameData">Loading...</span>
  <div class="game" v-else>
    <div class="game-body col-sm-8 col-md-8 col-lg-8 col-xl-8">
      <div class="game-name">
        <div class="left-part">
          <span class="title">{{ gameData.name }}</span>
          <span class="company-name">
          Компания {{ currentPlayer.companyName }}
        </span>
        </div>
        <div class="spacer"></div>
        <app-button icon="user-plus"
                    @click="invitePlayer"
                    class="header-button"/>
        <app-button icon="sign-out-alt"
                    @click="exitFromRoom"
                    class="header-button"/>
      </div>
      <game-header/>
      <div class="game-content">
        <game-left-menu
            class="game-content-left-menu col-sm-1 col-md-1 col-lg-1 col-xl-1"
            @selected-screen="currentScreen = $event"/>
        <component :is="currentScreen" class="game-content-screen"
                   :company="currentPlayer.company">
        </component>
      </div>
      <GameRatingPanel/>
    </div>
    <chat class="col-sm-3 col-md-3 col-lg-3 col-xl-3"
          :room-id="gameData.id">
    </chat>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  import Chat from '~/components/chat/Chat';
  import AppButton from '~/components/AppButton.vue';
  import GameHeader from './GameHeader';
  import GameLeftMenu from './GameLeftMenu';
  import { connectRoom, disconnectRoom } from '~/websocket.js';
  import {
    GameScreenBank,
    GameScreenIndustry,
    GameScreenManage,
    GameScreenWarehouse,
  } from './screen';
  import GameRatingPanel from './rating';
  import { startSchedule, stopSchedule } from '~/timeScheduler';

  export default {
    name: 'game',
    components: {
      GameRatingPanel,
      GameLeftMenu,
      GameHeader,
      Chat,
      AppButton,
      GameScreenBank,
      GameScreenWarehouse,
      GameScreenManage,
      GameScreenIndustry,
    },
    data() {
      return {
        currentScreen: 'GameScreenIndustry',
      };
    },
    computed: {
      ...mapState('game', ['gameData', 'currentPlayer']),
    },
    watch: {
      gameData(newData, oldData) {
        if (oldData && newData && newData.currentPeriod === oldData.currentPeriod) {
          stopSchedule();
        } else {
          startSchedule(newData.startCountDownTime);
        }
      },
    },
    methods: {
      ...mapActions('game', ['tryConnectRoom', 'disconnectFromGame']),
      ...mapActions('chat', ['clearMessages']),
      ...mapActions('rooms', ['connectToRoom']),
      exitFromRoom() {
        this.$router.push({ name: 'rooms' });
      },
      invitePlayer() {

      },
    },
    async created() {
      if (!this.gameData) {
        await this.connectToRoom({
          id: this.$route.params.roomId,
          password: '',
          companyName: '',
        }).catch((_error) => {
          // TODO notify
          this.$router.push({ name: 'rooms' });
        });
      }

      connectRoom(this.$route.params.roomId)
        .then(() => this.clearMessages())
        .then(() => startSchedule(this.gameData.startCountDownTime))
        .catch((_error) => {
          // TODO notify
        });
    },
    beforeRouteLeave(to, from, next) {
      if (confirm('Хотите покинуть игру?') && this.gameData) {
        this.disconnectFromGame()
          .then(() => disconnectRoom(this.gameData.id));
      }
      next();
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game
    display: flex
    width: 100%
    justify-content: space-between
    margin-bottom: base-unit(40)

    &-name
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

    &-body
      display: flex
      flex-direction: column
      flex: 1
      margin-right: base-unit(40)

    &-content
      display: flex
      flex: 1

      &-left-menu
        margin-right: base-unit(15)

      &-screen
        display: flex
        flex: 1
        padding: base-unit(10)

  .title
    +title

</style>
