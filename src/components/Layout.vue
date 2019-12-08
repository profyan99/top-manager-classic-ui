<template>
  <div class="wrapper">
    <div class="layout-container" v-if="isLoggedIn">
      <div class="header-wrapper">
        <nav-bar></nav-bar>
      </div>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
      <div class="footer-wrapper">

      </div>
    </div>
    <login v-else></login>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Login from '~/pages/login';
  import NavBar from '~/components/NavBar';

  export default {
    name: 'layout',
    components: {
      Login,
      NavBar,
    },
    computed: {
      ...mapGetters('user', ['isLoggedIn']),
    },
    created() {
      this.getCurrentUser();
    },
    methods: {
      ...mapActions('user', ['getCurrentUser']),
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .wrapper
    font-size: $base-font-size
    min-height: 100vh
    background-color: $bg-main
    color: $fg-main
    +main-font()
    max-width: $max-content-width
    margin: 0 auto
    display: flex

  .layout-container
    margin: auto
    display: flex
    flex-direction: column
    min-height: 100vh
    width: 100%
    padding: 0 base-unit(40)
    box-sizing: border-box

  .header-wrapper
    flex-direction: column
    flex: 0 0 auto

  .content-wrapper
    flex: 1 0 auto
    display: flex

  .footer-wrapper
    flex: 0 0 auto

</style>
