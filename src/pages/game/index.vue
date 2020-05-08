<template>
  <span v-if="!gameData">Loading...</span>
  <div class="game" v-else>
    <div class="game-body col-sm-8 col-md-8 col-lg-8 col-xl-8">
      <game-header/>
      <game-top-bar/>
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
    <ask-company-name-modal v-if="isModalActive"
                             @close="isModalActive = false"/>
    <ask-restart-game-modal v-if="newGame.id"
                            :new-game-id="newGame.id"
                            @close="clearNewGame"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import Chat from '~/components/chat/Chat';
  import AppButton from '~/components/AppButton.vue';
  import AskCompanyNameModal from '~/pages/game/modal/AskCompanyNameModal';
  import GameHeader from '~/pages/game/GameHeader';
  import AskRestartGameModal from '~/pages/game/modal/AskRestartGameModal';
  import GameTopBar from './GameTopBar';
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
      AskRestartGameModal,
      GameHeader,
      AskCompanyNameModal,
      GameRatingPanel,
      GameLeftMenu,
      GameTopBar,
      Chat,
      AppButton,
      GameScreenBank,
      GameScreenWarehouse,
      GameScreenManage,
      GameScreenIndustry,
    },
    data() {
      return {
        isModalActive: false,
        currentScreen: 'GameScreenIndustry',
      };
    },
    computed: {
      ...mapState('game', ['gameData', 'currentPlayer', 'newGame']),
      ...mapGetters('game', ['players']),
      isCompanyNameAlreadyInit() {
        const { currentPlayer } = this;
        return currentPlayer && currentPlayer.companyName;
      },
    },
    watch: {
      gameData(newData, oldData) {
        if (oldData && newData
          && newData.currentPeriod === oldData.currentPeriod) {
          stopSchedule();
        } else {
          startSchedule(newData.startCountDownTime);
        }
      },
    },
    methods: {
      ...mapActions('game', ['disconnectFromGame', 'clearNewGame']),
      ...mapActions('chat', ['clearMessages']),
      ...mapActions('rooms', ['connectToRoom']),
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

      this.isModalActive = !this.isCompanyNameAlreadyInit;
    },
    beforeRouteLeave(to, from, next) {
      const result = confirm('Хотите покинуть игру?');
      if (result && this.gameData) {
        this.disconnectFromGame()
          .then(() => disconnectRoom(this.gameData.id));
        next();
      }
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

    &-body
      display: flex
      flex-direction: column
      flex: 1
      margin-right: base-unit(40)

    &-content
      display: flex
      flex: 1

      &-screen
        display: flex
        flex: 1
        padding: base-unit(25) 0 base-unit(25) base-unit(25)

  .title
    +title

</style>
