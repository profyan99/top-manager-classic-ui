<template>
  <div id="app">
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

</style>
