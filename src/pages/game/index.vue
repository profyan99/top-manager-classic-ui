<template>
  <div class="game">
    <div class="game-body">
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
        <component :is="currentScreen" class="game-content-screen">
        </component>
      </div>
      <div class="game-solution">
        <div class="game-solution-header">
          <span class="subtitle">Управление</span>
        </div>
        <div class="game-solution-content">
          <game-solution-input v-for="solutionInput in solutionInputs"
                               :key="solutionInput.label"
                               v-model="solutionForm[solutionInput.model]"
                               v-bind="solutionInput">
          </game-solution-input>
        </div>
      </div>
    </div>
    <chat class="col-sm-3 col-md-3 col-lg-3 col-xl-3"
          :room-id="gameData.roomId">
    </chat>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
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
  import GameSolutionInput from '~/components/game/GameSolutionInput';

  export default {
    name: 'game',
    components: {
      GameSolutionInput,
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
        solutionForm: {
          price: 0,
          production: 0,
          marketing: 0,
          investments: 0,
          nir: 0,
        },
      };
    },
    computed: {
      ...mapState('game', ['gameData']),
      ...mapGetters('game', ['currentPlayer']),
      screenToShow() {
        return () => import(`~/components/game/screen/${ this.currentScreen }`);
      },
      solutionInputs() {
        return [
          {
            label: 'Цена',
            additional: '100$',
            model: 'price',
          },
          {
            label: 'Производство',
            additional: '1440',
            model: 'production',
          },
          {
            label: 'Маркетинг',
            additional: '1000$',
            model: 'marketing',
          },
          {
            label: 'Инвестиции',
            additional: '5500$',
            model: 'investments',
          },
          {
            label: 'НИОКР',
            additional: '15000$',
            model: 'nir',
          },
        ];
      },
    },
    methods: {
      ...mapActions('game', ['tryConnectRoom']),
      ...mapActions('chat', ['clearMessages']),
      exitFromRoom() {
        disconnectRoom();
        this.$router.push({ name: 'rooms' });
      },
      invitePlayer() {

      },
    },
    created() {
      if (!this.gameData) {
        this.$router.push({ name: 'rooms' });
        return;
      }

      connectRoom(this.$route.params.roomId)
        .then(this.clearMessages())
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
      margin-top: base-unit(15)

      &-left-menu
        margin-right: base-unit(15)

      &-screen
        display: flex
        flex: 1

    &-solution
      display: flex
      flex-direction: column

      &-header
        display: flex
        align-items: center
        background-color: $red
        border-radius: $base-border-radius
        color: $bg-main
        min-height: base-unit(40)
        padding: 0 base-unit(20)
        margin-top: base-unit(15)
        margin-bottom: base-unit(20)

      &-content
        display: flex
        align-items: center
        justify-content: space-between

  .title
    +title

  .subtitle
    font-size: base-unit(16)
    font-weight: bold
    font-style: normal
    color: $bg-main

</style>
