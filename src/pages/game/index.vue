<template>
  <div class="game">
    <game-header/>
    <div class="game-body">
      <div class="game-content col-sm-8 col-md-8 col-lg-7 col-xl-7">
        <game-left-menu class="game-content-left-menu"
                        @selected-screen="currentScreen = $event"/>
        <component :is="currentScreen" class="game-content-screen">
        </component>
      </div>
      <chat class="col-sm-3 col-md-3 col-lg-4 col-xl-4">
      </chat>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Chat from '~/components/rooms/Chat';
  import GameHeader from '~/components/game/GameHeader';
  import GameLeftMenu from '~/components/game/GameLeftMenu';
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
      GameScreenBank,
      GameScreenSummary,
      GameScreenWarehouse,
      GameScreenProduction,
      GameScreenManaging,
      GameScreenIndustry,
    },
    computed: {
      ...mapState('game', ['currentScreen']),
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game
    display: flex

    &-body
      display: flex
      margin-top: base-unit(15)

    &-content
      display: flex

      &-left-menu
        margin-right: base-unit(15)

      &-screen
        display: flex
        flex: 1


</style>
