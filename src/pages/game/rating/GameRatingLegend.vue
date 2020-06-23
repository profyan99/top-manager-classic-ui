<template>
  <div class="game-rating-legend">
    <span
      v-for="(item, index) in legendItems"
      :key="item"
      class="game-rating-legend-item"
      :class="{ 'company-name': !index }"
    >
      {{ item }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GameRatingLegend',
  data() {
    return {
      legendItems: [
        'Компания',
        'Цена',
        'Выручка',
        'Прибыль',
        'Н. Прибыль',
        'Доля рынка',
        'Рейтинг',
      ],
    };
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.game-rating-legend
  display: flex
  flex-direction: column
  background-color: $red
  border-radius: $base-border-radius
  color: $bg-main
  padding: base-unit(10)
  min-width: base-unit(100)

  &-item
    padding: base-unit(1) 0
    font-size: base-unit(14)
    font-weight: 600
    font-style: normal

.company-name
  margin-bottom: base-unit(5)
</style>
