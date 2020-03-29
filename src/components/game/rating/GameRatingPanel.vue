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
        return [
          {
            id: 0,
            state: 'WAIT',
            userName: 'Zero',
            companyName: 'Zero',
            isBankrupt: false,
            stats: {
              rating: 100,
              price: 30,
              revenue: 8600,
              netProfit: 3600,
              accumulatedProfit: 18400,
              marketingPart: 10,
            },
          },
          {
            id: 1,
            state: 'WAIT',
            userName: 'First',
            companyName: 'First',
            isBankrupt: false,
            stats: {
              rating: 100,
              price: 30,
              revenue: 8600,
              netProfit: 3600,
              accumulatedProfit: 18400,
              marketingPart: 10,
            },
          },
          {
            id: 2,
            state: 'WAIT',
            userName: 'Second',
            companyName: 'Second',
            isBankrupt: true,
            stats: {
              rating: 100,
              price: 30,
              revenue: 8600,
              netProfit: 3600,
              accumulatedProfit: 1840000,
              marketingPart: 10,
            },
          },
          {
            id: 3,
            state: 'WAIT',
            userName: 'Third',
            companyName: 'Third',
            isBankrupt: false,
            stats: {
              rating: 100,
              price: 30,
              revenue: 860000,
              netProfit: 3600,
              accumulatedProfit: 1840000,
              marketingPart: 10.3223,
            },
          },
          {
            id: 4,
            state: 'WAIT',
            userName: 'Fouth',
            companyName: 'Fouth',
            isBankrupt: false,
            stats: {
              rating: 100,
              price: 30,
              revenue: 860000,
              netProfit: 3600,
              accumulatedProfit: 18400,
              marketingPart: 10,
            },
          },
          {
            id: 5,
            state: 'WAIT',
            userName: 'Fiths',
            companyName: 'Fiths',
            isBankrupt: false,
            stats: {
              rating: 100,
              price: 30,
              revenue: 8600,
              netProfit: 3600,
              accumulatedProfit: 18400,
              marketingPart: 10,
            },
          },
          {
            id: 6,
            state: 'WAIT',
            userName: 'Very large name',
            companyName: 'Very large name',
            isBankrupt: false,
            stats: {
              rating: 100,
              price: 30,
              revenue: 8600,
              netProfit: 3600,
              accumulatedProfit: 18400,
              marketingPart: 10,
            },
          },
          {
            id: 7,
            state: 'WAIT',
            userName: 'Naming',
            companyName: 'Company',
            isBankrupt: false,
            stats: {
              rating: 100,
              price: 30,
              revenue: 8600,
              netProfit: 3600,
              accumulatedProfit: 18400,
              marketingPart: 10,
            },
          },
        ];
        /* return players.sort((player1, player2) => {
          if (player1.isBankrupt) {
            return 1;
          }
          if (player2.isBankrupt) {
            return -1;
          }
          return player2.stats.rating - player1.stats.rating;
        }); */
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
      margin-top: base-unit(10)

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
        padding-bottom: base-unit(10) //for scroll

        &::-webkit-scrollbar
          background: transparent
          height: base-unit(5)

        &::-webkit-scrollbar-thumb
          border-radius: $base-border-radius
          background-color: $light-grey

</style>
