<template>
  <div class="rooms-wrapper container--fluid row">
    <div class="rooms">
      <div class="header">
        <span class="title">Игры</span>
        <div class="search">
          <app-input v-model="roomSearchWord"
                     placeholder="Поиск"
                     icon="search"
                     type="search"/>
        </div>
      </div>
      <div class="table">
        <div class="header">
          <span class="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">Название</span>
          <span class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Игроки</span>
          <span class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Раунд</span>
          <span class="hidden-md-down col-md-3 col-lg-3 col-xl-3">Режимы</span>
        </div>
        <div class="content">
          <template v-for="(room, index) in filteredRooms">
            <room-preview-list-item
                    @selected="openRoomPreview(room)"
                    :data="room"
                    :key="room.id">
            </room-preview-list-item>
            <div class="divider"
                 v-if="index < roomList.length - 1"
                 :key="-1 - index"></div>
          </template>
        </div>
      </div>
      <div class="actions">
        <span>Всего игр: {{ roomsAmount }}</span>
        <app-button label="Создать" @click="isModalCreateRoomShowing = true"/>
      </div>
    </div>
    <chat class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
      <template v-slot:chat-header-description>
        <span>Онлайн: {{ roomsMeta.playersAmount }}</span>
      </template>
    </chat>
    <room-connect-modal v-if="!!connectRoomData"
                        @close="connectRoomData = null"
                        :room="connectRoomData"/>
    <room-create-modal v-if="isModalCreateRoomShowing"
                       @close="isModalCreateRoomShowing = false"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import AppButton from '~/components/AppButton';
  import Chat from '~/components/chat';
  import AppInput from '~/components/AppInput';
  import RoomPreviewListItem from './RoomPreviewListItem';
  import RoomCreateModal from './createModal';
  import RoomConnectModal from './RoomConnectModal';
  import { subscribeRoomList, unsubscribeRoomList } from '~/websocket';

  export default {
    name: 'rooms',
    components: {
      AppButton,
      RoomConnectModal,
      RoomCreateModal,
      Chat,
      AppInput,
      RoomPreviewListItem,
    },
    data() {
      return {
        roomSearchWord: '',
        connectRoomData: null,
        isModalCreateRoomShowing: false,
      };
    },
    computed: {
      ...mapGetters('rooms', ['roomList', 'roomsMeta']),
      filteredRooms() {
        return this.roomList
          .filter((room) => room.name.toLowerCase()
            .includes(this.roomSearchWord.toLocaleLowerCase()));
      },
      roomsAmount() {
        return this.roomList.length;
      },
    },
    methods: {
      ...mapActions('rooms', ['getRooms']),
      ...mapActions('chat', ['clearMessages']),
      openRoomPreview(room) {
        this.connectRoomData = room;
      },
    },
    created() {
      this.getRooms()
        .then(() => subscribeRoomList())
        .then(() => this.clearMessages())
        .catch((_error) => {
          // TODO notify
        });
    },
    beforeDestroy() {
      unsubscribeRoomList();
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .rooms-wrapper
    justify-content: space-between
    margin-bottom: base-unit(40)

  .rooms
    display: flex
    flex-direction: column
    flex: 1
    margin-right: base-unit(40)

    .header
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      min-height: base-unit(40)

    .search
      display: flex

    .table
      display: flex
      flex-direction: column
      flex: 1
      margin-top: base-unit(15)
      border-bottom: base-unit(2) solid $grey

      .header
        width: 100%
        background-color: $red
        height: base-unit(40)
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
        padding-right: base-unit(15) // for scroll

        &::-webkit-scrollbar
          background: transparent
          width: base-unit(5)

        &::-webkit-scrollbar-thumb
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
