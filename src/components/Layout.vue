<template>
  <div class="wrapper">
    <router-view v-if="isLoggedIn"></router-view>
    <login v-else></login>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Login from '~/pages/login';

  export default {
    name: 'layout',
    components: {
      Login,
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
</style>
