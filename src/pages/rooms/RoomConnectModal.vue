<template>
  <modal @close="$emit('close')"
         @submit="connect">
    <template v-slot:header>
      <span>Комната {{ room.name }}</span>
    </template>
    <template v-slot:content>
      <div class="room-information">
        <div class="field-names">
          <span>Раунд</span>
          <span>Игроки</span>
          <span>Состояние</span>
          <span>Тип</span>
          <span v-if="room.scenario">Сценарий</span>
          <span v-if="!isUserAlreadyInRoom">Название компании</span>
          <span v-if="room.locked" class="password">Пароль</span>
        </div>
        <div class="field-values">
          <span>{{ room.currentPeriod }}</span>
          <span>{{ room.currentPlayers }}</span>
          <span>{{ roomState }}</span>
          <span>{{ roomType }}</span>
          <span v-if="room.scenario">{{ room.scenario.name }}</span>
          <span v-if="!isUserAlreadyInRoom">
                  <app-input v-model="companyName"
                             color="#555555"
                             placeholder="Введите название"
                             @blur="$v.companyName.$touch()"
                             error-message="Поле должно быть заполнено"
                             :error="$v.companyName.$error"/>
          </span>
          <span v-if="room.locked && !isUserAlreadyInRoom">
                  <app-input v-model="connectPassword"
                             color="#555555"
                             type="password"
                             placeholder="Введите пароль"
                             @blur="$v.connectPassword.$touch()"
                             error-message="Поле должно быть заполнено"
                             :error="$v.connectPassword.$error"/>
          </span>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <app-button label="Присоединиться" @click="connect"/>
    </template>
  </modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { minLength, required, } from 'vuelidate/lib/validators';
  import AppButton from '~/components/AppButton';
  import Modal from '~/components/Modal';
  import AppInput from '~/components/AppInput';
  import { convertRoomState } from '~/helpers/room';

  export default {
    name: 'RoomConnectModal',
    components: {
      AppButton,
      Modal,
      AppInput,
    },
    props: {
      room: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        connectPassword: '',
        companyName: '',
      };
    },
    computed: {
      ...mapState('user', [
        'user',
      ]),
      roomState() {
        return convertRoomState(this.room.state);
      },
      roomType() {
        if (this.room.tournament) {
          return 'Турнир';
        }
        return 'Обычный';
      },
      isUserAlreadyInRoom() {
        const { room, user: { userName } } = this;
        return room.players.some((player) => player === userName);
      },
    },
    methods: {
      ...mapActions('rooms', ['connectToRoom']),
      connect() {
        const { room, connectPassword, companyName } = this;
        if (room.locked) {
          this.$v.connectPassword.$touch();
          if (this.$v.$error) {
            return;
          }
        }
        this.connectToRoom({
          id: room.id,
          password: connectPassword,
          companyName,
        })
          .then(() => {
            this.$router.push({
              name: 'game',
              params: { roomId: room.id },
            });
            this.$emit('close');
          })
          .catch((_error) => {
            // TODO notify
          });
      },
    },
    validations: {
      connectPassword: {
        required,
        minLength: minLength(6),
      },
      companyName: {
        required,
        minLength: minLength(6),
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .room-information
    display: flex

    .field
      &-names
        display: flex
        flex-direction: column
        color: $fg-main
        font-size: base-unit(14)
        font-weight: bold
        margin-right: base-unit(20)

        .password
          padding: base-unit(12) 0

        span
          padding: base-unit(2) 0

      &-values
        display: flex
        flex-direction: column
        color: $dark-fg-main
        font-size: base-unit(14)
        font-weight: normal

        span
          padding: base-unit(2) 0
</style>
