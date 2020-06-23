<template>
  <div class="game-rating-panel">
    <div class="game-rating-panel-header">
      <span class="title">Рейтинг</span>
      <app-button :icon="isOpen ? 'chevron-up' : 'chevron-down'"
                  @click="isOpen = !isOpen"
                  class="expand-button"
      />
    </div>
    <div class="game-rating-panel-content" v-show="isOpen">
      <GameRatingLegend/>
      <div class="rating-items">
        <GameRatingItem
            v-for="company in companies"
            :key="company.id"
            :company="company"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import GameRatingItem from './GameRatingItem';
  import GameRatingLegend from './GameRatingLegend';
  import AppButton from '~/components/AppButton';

  export default {
    name: 'GameRatingPanel',
    components: {
      GameRatingItem,
      GameRatingLegend,
      AppButton,
    },
    data() {
      return {
        isOpen: true,
      };
    },
    computed: {
      ...mapGetters('game', ['players']),
      companies() {
        const { players } = this;
        return players
          .filter((company) => company.companyName.length)
          .sort((player1, player2) => {
            if (player1.isBankrupt) {
              return 1;
            }
            if (player2.isBankrupt) {
              return -1;
            }
            return player2.stats.rating - player1.stats.rating;
          });
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-rating-panel
    display: flex
    flex-direction: column

    &-header
      display: flex
      align-items: center
      justify-content: space-between
      background-color: $red
      border-radius: $base-border-radius
      min-height: base-unit(40)
      padding: 0 base-unit(20)

      .title
        font-size: base-unit(16)
        font-weight: normal
        font-style: normal
        +black-frame

      .expand-button
        +black-frame

    &-content
      margin-top: base-unit(10)
      display: flex

      .rating-items
        display: flex
        margin-top: base-unit(10)
        margin-left: base-unit(5)
        margin-right: base-unit(5)
        overflow-x: auto

        &::-webkit-scrollbar
          background: transparent
          height: base-unit(20)

        &::-webkit-scrollbar-thumb
          border: base-unit(7.5) solid rgba(0, 0, 0, 0)
          background-clip: padding-box
          height: base-unit(5)
          border-radius: $base-border-radius
          background-color: $light-grey

</style>
