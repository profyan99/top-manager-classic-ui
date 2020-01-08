<template>
  <div class="game">
    <div class="game-body">
      <div class="game-name">
        <span class="title">{{ gameData.name }}</span>
        <app-button label="Выход" @click="exitFromRoom"/>
      </div>
      <game-header/>
      <div class="game-content">
        <game-left-menu class="game-content-left-menu"
                        @selected-screen="currentScreen = $event"/>
        <component :is="currentScreen" class="game-content-screen">
        </component>
      </div>
    </div>
    <chat class="col-sm-3 col-md-3 col-lg-3 col-xl-3"
          :room-id="gameData.roomId">
    </chat>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import Chat from '~/components/rooms/Chat';
  import AppButton from '~/components/AppButton.vue';
  import GameHeader from '~/components/game/GameHeader';
  import GameLeftMenu from '~/components/game/GameLeftMenu';
  import { connectRoom, disconnectRoom } from '~/websocket.js';
  import GameScreenBank from '~/components/game/screen/GameScreenBank';
  import GameScreenIndustry from '~/components/game/screen/GameScreenIndustry';
  import GameScreenManaging from '~/components/game/screen/GameScreenManaging';
  import GameScreenProduction
    from '~/components/game/screen/GameScreenProduction';
  import GameScreenSummary from '~/components/game/screen/GameScreenSummary';
  import GameScreenWarehouse
    from '~/components/game/screen/GameScreenWarehouse';

  export default {
    name: 'game',
    components: {
      GameLeftMenu,
      GameHeader,
      Chat,
      AppButton,
      GameScreenBank,
      GameScreenSummary,
      GameScreenWarehouse,
      GameScreenProduction,
      GameScreenManaging,
      GameScreenIndustry,
    },
    data() {
      return {
        currentScreen: 'GameScreenSummary',
      };
    },
    computed: {
      ...mapState('game', ['gameData']),
      screenToShow() {
        return () => import(`~/components/game/screen/${ this.currentScreen }`);
      },
    },
    methods: {
      ...mapActions('game', ['tryConnectRoom']),
      exitFromRoom() {
        disconnectRoom();
        this.$router.push({ name: 'rooms' });
      },
    },
    created() {
      if (!this.gameData) {
        this.$router.push({ name: 'rooms' });
        return;
      }

      connectRoom(this.$route.params.roomId)
        .catch((_error) => {
          // TODO
        });
    },
    beforeDestroy() {
      disconnectRoom();
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game
    display: flex
    width: 100%
    justify-content: space-between

    &-name
      display: flex
      flex-direction: row
      align-items: center
      min-height: base-unit(40)
      justify-content: space-between

    &-body
      display: flex
      flex-direction: column
      flex: 1
      margin-right: base-unit(40)

    &-content
      display: flex
      margin-top: base-unit(10)

      &-left-menu
        margin-right: base-unit(15)

      &-screen
        display: flex
        flex: 1

  .title
    +title

</style>
