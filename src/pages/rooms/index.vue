<template>
  <div class="content container--fluid row">
    <div class="rooms col-sm-8 col-md-8 col-lg-7 col-xl-7">
      <div class="header">
        <span class="title">Комнаты</span>
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
        <span>Всего комнат: {{ roomsAmount }}</span>
        <div class="button-create-room"
             @click="isModalCreateRoomShowing = true">
          Создать
        </div>
      </div>
    </div>
    <chat class="col-sm-3 col-md-3 col-lg-4 col-xl-4">
      <template v-slot:chat-header-description>
        <span>Онлайн: {{ playersAmount }}</span>
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
  import Chat from '~/components/rooms/Chat';
  import AppInput from '~/components/AppInput';
  import RoomPreviewListItem from '~/components/rooms/RoomPreviewListItem';
  import RoomCreateModal from '~/pages/rooms/RoomCreateModal';
  import RoomConnectModal from '~/pages/rooms/RoomConnectModal';
  import { subscribeRoomList, unsubscribeRoomList } from '~/websocket';

  export default {
    name: 'rooms',
    components: {
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
      ...mapGetters('rooms', ['roomList']),
      filteredRooms() {
        return this.roomList
          .filter((room) => room.name.toLowerCase()
            .includes(this.roomSearchWord.toLocaleLowerCase()));
      },
      roomsAmount() {
        return this.roomList.length;
      },
      playersAmount() {
        return this.roomList
          .map((room) => room.currentPlayers)
          .reduce((sum, next) => sum + next, 0);
      },
    },
    methods: {
      ...mapActions('rooms', ['getRooms']),
      openRoomPreview(room) {
        this.connectRoomData = room;
      },
    },
    created() {
      this.getRooms()
        .then(subscribeRoomList())
        .catch((_error) => {
          // TODO
        });
    },
    beforeDestroy() {
      unsubscribeRoomList();
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .content
    justify-content: space-between

  .rooms
    display: flex
    flex-direction: column

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
      height: base-unit(550)
      max-height: base-unit(550)
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
        scrollbar-width: none
        -ms-overflow-style: none

        &::-webkit-scrollbar
          width: 0
          background: transparent

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

    .button-create-room
      margin-left: base-unit(10)
      background-color: $red
      cursor: pointer
      text-align: center
      color: $fg-main
      font-size: base-unit(14)
      border-radius: $base-border-radius
      padding: base-unit(10)
      box-sizing: border-box
      display: flex
      align-items: center
      justify-content: center

      &:hover
        opacity: 0.8

  .title
    +title

  .divider
    width: 100%
    background: $grey
    height: base-unit(2)

</style>
