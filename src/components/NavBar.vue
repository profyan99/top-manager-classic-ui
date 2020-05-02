<template>
  <div class="nav-bar">
    <div class="logo">
      <span class="main">Top Manager</span>
    </div>
    <div class="links">
      <div class="link-item"
           v-for="link in links"
           @click="performLinkAction(link)"
           :class="{ 'link-selected': link.route === activePage }"
           :key="link.title">
        <span>{{ link.title }}</span>
      </div>
    </div>
    <div class="profile"
         @click="modalActive = !modalActive">
      <div class="avatar">
        <img v-if="user.avatar" class="avatar" :src="user.avatar" alt="avatar">
      </div>
      <span class="user-name">{{ user.userName }}</span>
      <div class="modal"
           v-if="modalActive"
           @focusout="modalActive = false"
      >
        <span @click="logout">Выход</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'navbar',
    data() {
      return {
        modalActive: false,
        links: [
          {
            title: 'Игры',
            route: 'rooms',
          },
          {
            title: 'Поддержка',
            route: 'support',
          },
          {
            title: 'Оставить отзыв',
            route: 'feedback',
          },
        ],
      };
    },
    computed: {
      ...mapState('user', ['user']),
      activePage() {
        return this.$route.name;
      },
    },
    methods: {
      ...mapActions('user', ['logout']),
      performLinkAction({ route }) {
        this.$router.push({ name: route });
      },
    },
  };
</script>


<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  $nav-font-size: base-unit(14)

  .nav-bar
    padding: base-unit(10) 0
    display: flex
    flex-direction: row
    align-items: center

  .logo
    display: flex
    flex-direction: column

    .main
      font-size: base-unit(16)
      font-style: normal
      font-weight: 900
      color: $fg-main
      text-transform: uppercase

    .sub
      font-size: base-unit(8)
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
    margin-left: base-unit(40)

    .link-item
      padding: base-unit(10)
      margin-right: base-unit(5)
      cursor: pointer

      &:hover span
        color: #b1b1b1

      span
        font-weight: 500
        font-size: $nav-font-size
        font-style: normal
        color: $dark-fg-main
        padding: base-unit(5) 0

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

    .user-name
      font-weight: 500
      font-size: $nav-font-size
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
      font-size: $nav-font-size
      font-style: normal

    &:hover
      color: #b1b1b1

  .modal-wrapper
    position: fixed
    z-index: 15
    width: 100vw
    height: 100vh
    left: 0
    top: 0
    opacity: 0

</style>
