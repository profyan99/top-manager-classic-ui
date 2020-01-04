<template>
  <div class="game-left-menu">
    <div class="menu-item"
         v-for="item in menuItems"
         :key="item.name"
         @click="$emit('selected-screen', item.component)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GameLeftMenu',
    data() {
      return {
        menuItems: [
          {
            name: 'Сводка',
            component: 'GameScreenSummary',
          },
          {
            name: 'Банк',
            component: 'GameScreenBank',
          },
          {
            name: 'Склад',
            component: 'GameScreenWarehouse',
          },
          {
            name: 'Производство',
            component: 'GameScreenProduction',
          },
          {
            name: 'Индустрия',
            component: 'GameScreenIndustry',
          },
          {
            name: 'Управление',
            component: 'GameScreenManaging',
          },
        ],
      };
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-left-menu
    display: flex
    flex-direction: column
    align-items: center

    .menu-item
      width: base-unit(60)
      height: base-unit(60)
      background-color: $light-grey
      margin: base-unit(5) 0
      cursor: pointer

      &:hover
        opacity: 0.8

</style>
