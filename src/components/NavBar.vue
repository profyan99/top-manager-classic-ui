<template>
  <div class="nav-bar">
    <div class="logo">
      <span class="main">Top Manager</span>
      <span class="sub">oil tycoon</span>
    </div>
    <div class="links">
      <div class="link-item"
           v-for="link in links"
           @click="performLinkAction(link)"
           :class="{ 'link-selected': link.title === activePage }"
           :key="link.title">
        <span>{{ link.title }}</span>
      </div>
    </div>
    <div class="profile"
         @mouseover="modalActive = true">
      <div class="avatar">

      </div>
      <span class="user-name">{{ user.username }}</span>
      <div class="modal"
           v-if="modalActive"
           @mouseleave="modalActive = false">
        <span @click="logout">Выход</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'navbar',
    data() {
      return {
        activePage: 'Комнаты',
        modalActive: false,
        links: [
          {
            title: 'Комнаты',
            route: 'rooms',
          },
          {
            title: 'Поддержка',
            route: 'support',
          },
          {
            title: 'Обратная связь',
            route: 'feedback',
          },
        ],
      };
    },
    computed: {
      ...mapState('user', [
        'user',
      ]),
    },
    methods: {
      ...mapActions('user', [
        'logout',
      ]),
      performLinkAction({ title, route }) {
        this.activePage = title;
        this.$router.push({ name: route });
      },
    },
  };
</script>


<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .nav-bar
    padding: base-unit(20) 0
    display: flex
    flex-direction: row
    align-items: center
    height: base-unit(50)

  .logo
    display: flex
    flex-direction: column

    .main
      font-size: base-unit(20)
      font-style: normal
      font-weight: 900
      color: $fg-main
      text-transform: uppercase

    .sub
      font-size: base-unit(10)
      font-style: normal
      font-weight: 300
      letter-spacing: 0.93em
      color: $fg-main
      text-transform: uppercase

  .links
    display: flex
    flex-direction: row
    flex: 1
    align-items: center
    margin-left: base-unit(70)

    .link-item
      padding: base-unit(10)
      margin-right: base-unit(20)
      cursor: pointer

      &:hover span
        color: #b1b1b1

      span
        font-weight: 500
        font-size: base-unit(16)
        font-style: normal
        color: $dark-fg-main
        padding: base-unit(10) 0

    .link-selected

      &:hover span
        color: $dark-fg-main

      span
        color: $fg-main
        border-bottom: base-unit(2) solid $red

  .profile
    display: flex
    flex-direction: row
    align-items: center
    cursor: pointer
    position: relative

    .avatar
      border-radius: 100%
      height: base-unit(32)
      width: base-unit(32)
      background-color: $red

    .user-name
      font-weight: 500
      font-size: base-unit(16)
      font-style: normal
      color: $dark-fg-main
      margin-left: base-unit(20)

  .modal
    position: absolute
    top: base-unit(40)
    right: 0
    box-sizing: border-box
    width: 100%
    background-color: $grey
    padding: base-unit(10)

    span
      width: 100%
      padding-left: base-unit(42)
      color: $dark-fg-main
      font-weight: normal
      font-size: base-unit(14)
      font-style: normal

    &:hover
      color: #b1b1b1

</style>
