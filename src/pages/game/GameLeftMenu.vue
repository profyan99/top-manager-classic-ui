<template>
  <div class="game-left-menu">
    <div class="menu-item"
         v-for="item in menuItems"
         :key="item.name"
         @click="$emit('selected-screen', item.component)">

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
            name: 'Доходы',
            component: 'GameScreenBank',
          },
          {
            name: 'Отчет',
            component: 'GameScreenWarehouse',
          },
          {
            name: 'Индустрия',
            component: 'GameScreenIndustry',
          },
          {
            name: 'Управление',
            component: 'GameScreenManage',
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
    margin: base-unit(5) 0

    .menu-item
      width: 100%
      height: base-unit(60)
      background-color: $light-grey
      margin: base-unit(5) 0
      cursor: pointer

      &:hover
        opacity: 0.8

</style>
