<template>
  <div class="wrapper">
    <div class="layout-container" v-if="isLoggedIn">
      <div class="header-wrapper">
        <nav-bar />
      </div>
      <div class="content-wrapper">
        <router-view :key="$route.fullPath" />
      </div>
      <div class="footer-wrapper"></div>
    </div>
    <login v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  async created() {
    const {
      $route: { query },
      getCurrentUser,
      signInThrowSocial,
      fetchAuthTokens,
    } = this;
    if (query.access_token && query.refresh_token) {
      signInThrowSocial(query)
        .then(getCurrentUser())
        .then(() => this.$router.replace('/'));
    } else {
      await fetchAuthTokens();
      await getCurrentUser().catch((_error) => {});
    }
  },
  methods: {
    ...mapActions('user', [
      'getCurrentUser',
      'signInThrowSocial',
      'fetchAuthTokens',
    ]),
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

$header_height: 50

.wrapper
  font-size: $base-font-size
  min-height: 100vh
  color: $fg-main
  +main-font()
  margin: 0 auto
  display: flex

.layout-container
  margin: auto
  display: flex
  flex-direction: column
  min-height: 100vh
  max-height: 100vh
  width: 100%
  padding: 0 base-unit(40)
  box-sizing: border-box

.header-wrapper
  height: base-unit($header_height)
  flex-direction: column
  flex: 0 0 auto

.content-wrapper
  flex: 1 0 auto
  display: flex
  min-height: 0
  max-height: calc(100vh - #{base-unit($header_height)})

.footer-wrapper
  flex: 0 0 auto
</style>
