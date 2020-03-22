<template>
  <div class="game-summary">
    <span class="game-summary-title">Summary</span>
    <div class="game-summary-content">
      <div class="game-summary-content-headers">
          <span v-for="(companyItem, index) in Object.keys(company)"
                :key="index">
              {{ companyItem }}:
          </span>
      </div>
      <div class="game-summary-content-values">
          <span v-for="(companyItem, index) in Object.keys(company)"
                :key="index">
              {{ company[companyItem] }}
          </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GameScreenSummary',
    data() {
      return {};
    },
    props: {
      company: {
        required: true,
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-summary
    display: flex
    flex-direction: column

    &-title
      margin-bottom: base-unit(10)
      font-weight: bold

    &-content
      display: flex
      flex-direction: row
      align-items: flex-start

      &-headers
        display: flex
        flex-direction: column
        margin-right: base-unit(10)

        span
          color: $dark-fg-main

      &-values
        display: flex
        flex-direction: column
        flex: 1
        justify-content: flex-start

        span
          color: $light-grey
</style>
