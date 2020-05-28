<template>
  <div class="games-wrapper row">
    <div class="games">
      <div class="header">
        <span class="title">Игры</span>
        <div class="search">
          <app-input
            v-model="gameSearchWord"
            placeholder="Поиск"
            icon="search"
            type="search"
          />
        </div>
      </div>
      <div class="table">
        <div class="header-table">
          <span class="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
            Название
          </span>
          <span class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Игроки</span>
          <span class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Раунд</span>
          <span class="hidden-md-down col-md-3 col-lg-3 col-xl-3">Режимы</span>
        </div>
        <div class="content">
          <template v-for="(game, index) in filteredGames">
            <game-preview-list-item
              @selected="openGamePreview(game)"
              :data="game"
              :key="game.id"
            >
            </game-preview-list-item>
            <div
              class="divider"
              v-if="index < gameList.length - 1"
              :key="-1 - index"
            ></div>
          </template>
        </div>
      </div>
      <div class="actions">
        <span>Всего игр: {{ gamesAmount }}</span>
        <app-button label="Создать" @click="isModalCreateGameShowing = true" />
      </div>
    </div>
    <chat class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
      <template v-slot:chat-header-description>
        <span>Онлайн: {{ gamesMeta.playersAmount }}</span>
      </template>
    </chat>
    <game-connect-modal
      v-if="!!connectGameData"
      @close="connectGameData = null"
      :game="connectGameData"
    />
    <game-create-modal
      v-if="isModalCreateGameShowing"
      @close="isModalCreateGameShowing = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppButton from '~/components/AppButton';
import Chat from '~/components/chat';
import AppInput from '~/components/AppInput';
import GamePreviewListItem from './GamePreviewListItem';
import GameCreateModal from './createModal';
import GameConnectModal from './GameConnectModal';
import { subscribeGameList, unsubscribeGameList } from '~/websocket';

export default {
  name: 'gameList',
  components: {
    AppButton,
    GameConnectModal,
    GameCreateModal,
    Chat,
    AppInput,
    GamePreviewListItem,
  },
  props: {
    gamePreviewId: {
      default: null,
    },
  },
  data() {
    return {
      gameSearchWord: '',
      connectGameData: null,
      isModalCreateGameShowing: false,
    };
  },
  computed: {
    ...mapGetters('gameList', ['gameList', 'gamesMeta']),
    filteredGames() {
      return this.gameList.filter((game) =>
        game.name
          .toLowerCase()
          .includes(this.gameSearchWord.toLocaleLowerCase()),
      );
    },
    gamesAmount() {
      return this.gameList.length;
    },
  },
  methods: {
    ...mapActions('gameList', ['getGames']),
    ...mapActions('chat', ['clearMessages']),
    openGamePreview(game) {
      this.connectGameData = game;
    },
  },
  async created() {
    try {
      const { getGames, clearMessages, gamePreviewId, gameList } = this;
      await subscribeGameList();
      await getGames();
      clearMessages();

      if (gamePreviewId) {
        this.connectGameData = gameList.find(
          (game) => game.id === gamePreviewId,
        );
      }
    } catch (error) {
      this.$notification.error(error);
    }
  },
  beforeRouteLeave(to, from, next) {
    unsubscribeGameList();
    next();
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.games-wrapper
  justify-content: space-between
  margin-bottom: base-unit(40)

.games
  display: flex
  flex-direction: column
  flex: 1
  margin-right: base-unit(40)

  .header
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: flex-end
    height: base-unit(32)

  .search
    display: flex

  .table
    display: flex
    flex-direction: column
    flex: 1
    margin-top: base-unit(15)
    border-bottom: base-unit(2) solid $grey

    .header-table
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      height: base-unit(40)
      width: 100%
      background-color: $red
      border-radius: $base-border-radius
      font-size: base-unit(14)
      color: $bg-main
      font-weight: bold

      span
        text-align: center

    .content
      display: flex
      flex-direction: column
      box-sizing: border-box
      margin-top: base-unit(10)
      overflow-y: auto
      max-height: calc(100vh - #{base-unit(300)})

      &::-webkit-scrollbar
        background: transparent
        width: base-unit(20)

      &::-webkit-scrollbar-thumb
        border: base-unit(7.5) solid rgba(0, 0, 0, 0)
        background-clip: padding-box
        width: base-unit(5)
        border-radius: $base-border-radius
        background-color: $light-grey

.actions
  margin-top: base-unit(40)
  display: flex
  justify-content: space-between
  align-items: center

  span
    font-size: base-unit(14)
    font-weight: normal
    font-style: normal
    color: $light-grey

.title
  +title

.divider
  width: 100%
  background: $grey
  height: base-unit(2)
</style>
