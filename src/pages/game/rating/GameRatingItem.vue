<template>
  <div class="game-rating-item" :class="{ bankrupt: company.isBankrupt }">
    <span class="company-name" :class="{
      bankrupt: company.isBankrupt,
      'think-state' : company.state === 'THINK' && !company.isBankrupt,
    }">
      {{ company.companyName }}
    </span>
    <span>
      $ {{ company.stats.price }}
    </span>
    <span>
      $ {{ convertBigNumber(company.stats.revenue) }}
    </span>
    <span>
      $ {{ convertBigNumber(company.stats.netProfit) }}
    </span>
    <span>
      $ {{ convertBigNumber(company.stats.accumulatedProfit) }}
    </span>
    <span>
      {{ company.stats.marketingPart.toFixed(1) }} %
    </span>
    <span>
      {{ company.isBankrupt ? 'Банкрот' : company.stats.rating }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'GameRatingItem',
    props: {
      company: {
        required: true,
        type: Object,
      },
    },
    methods: {
      round(number, precision) {
        const prec = 10 ** precision;
        return Math.round(number * prec) / prec;
      },
      convertBigNumber(number) {
        const abbreviations = ['k', 'm', 'b'];
        let base = Math.floor(Math.log(Math.abs(number)) / Math.log(1000));
        const suffix = abbreviations[Math.min(2, base - 1)];
        base = abbreviations.indexOf(suffix) + 1;
        return number;
        /* return suffix
          ? this.round(number / 1000 ** base, 2) + suffix
          : `${number}`; */
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-rating-item
    display: flex
    flex-direction: column
    margin: 0 base-unit(8)
    max-width: base-unit(90)
    min-width: base-unit(90)
    font-size: base-unit(14)
    color: $dark-fg-main

    .company-name
      font-size: base-unit(16)
      font-weight: normal
      font-style: normal
      color: $fg-main
      margin-bottom: base-unit(5)
      text-overflow: ellipsis
      white-space: nowrap
      overflow: hidden

      &.bankrupt
        color: $light-grey

      &.think-state
        color: $red

  .bankrupt
    color: $light-grey

  span
    padding: base-unit(1) 0

</style>
