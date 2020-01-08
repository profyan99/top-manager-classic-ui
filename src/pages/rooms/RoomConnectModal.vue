<template>
  <modal @close="$emit('close')">
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
          <span v-if="room.locked" class="password">Пароль</span>
        </div>
        <div class="field-values">
          <span>{{ room.currentRound }}</span>
          <span>{{ room.currentPlayers }}</span>
          <span>{{ roomState }}</span>
          <span>{{ roomType }}</span>
          <span v-if="room.scenario">{{ room.scenario }}</span>
          <span v-if="room.locked">
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
      <div class="confirm-button" @click="connect">
        Присоединиться
      </div>
    </template>
  </modal>
</template>

<script>
  import { mapActions } from 'vuex';
  import { minLength, required, } from 'vuelidate/lib/validators';
  import Modal from '~/components/Modal';
  import AppInput from '~/components/AppInput';
  import { convertRoomState } from '~/helpers/room';

  export default {
    name: 'RoomConnectModal',
    components: {
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
      };
    },
    computed: {
      roomState() {
        return convertRoomState(this.room.state);
      },
      roomType() {
        if (this.room.tournament) {
          return 'Турнир';
        }
        return 'Обычный';
      },
    },
    methods: {
      ...mapActions('rooms', ['connectToRoom']),
      connect() {
        const { room, connectPassword } = this;
        if (room.locked) {
          this.$v.connectPassword.$touch();
          if (this.$v.$error) {
            return;
          }
        }
        this.connectToRoom({
          id: room.id,
          password: connectPassword,
          companyName: 'test123456', // TODO
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