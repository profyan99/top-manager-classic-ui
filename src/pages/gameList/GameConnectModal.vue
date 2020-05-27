<template>
  <modal @close="$emit('close')" @submit="connect">
    <template v-slot:header>
      <span>Игра {{ game.name }}</span>
    </template>
    <template v-slot:content>
      <div class="game-information">
        <div class="field-names">
          <span>Раунд</span>
          <span>Игроки</span>
          <span>Состояние</span>
          <span>Тип</span>
          <span v-if="game.scenario">Сценарий</span>
          <span v-if="game.locked" class="password">Пароль</span>
        </div>
        <div class="field-values">
          <span>{{ game.currentPeriod }}</span>
          <span>{{ game.currentPlayers }}</span>
          <span>{{ gameState }}</span>
          <span>{{ gameType }}</span>
          <span v-if="game.scenario">{{ game.scenario.name }}</span>
          <span v-if="game.locked && !isUserAlreadyInGame">
            <app-input
              v-model="connectPassword"
              color="grey"
              type="password"
              placeholder="Введите пароль"
              @blur="$v.connectPassword.$touch()"
              error-message="Поле должно быть заполнено"
              :error="$v.connectPassword.$error"
            />
          </span>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <app-button label="Присоединиться" @click="connect" />
    </template>
  </modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { minLength, required } from 'vuelidate/lib/validators';
  import AppButton from '~/components/AppButton';
  import Modal from '~/components/Modal';
  import AppInput from '~/components/AppInput';
  import { convertGameState } from '~/utils/game';

  export default {
    name: 'GameConnectModal',
    components: {
      AppButton,
      Modal,
      AppInput,
    },
    props: {
      game: {
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
      ...mapState('user', ['user']),
      gameState() {
        return convertGameState(this.game.state);
      },
      gameType() {
        if (this.game.tournament) {
          return 'Турнир';
        }
        return 'Обычный';
      },
      isUserAlreadyInGame() {
        const {
          game,
          user: { userName },
        } = this;
        return game.players.some((player) => player === userName);
      },
    },
    methods: {
      ...mapActions('gameList', ['setGameConnectionData']),
      connect() {
        const { game, connectPassword } = this;
        if (game.locked) {
          this.$v.connectPassword.$touch();
          if (this.$v.$error) {
            return;
          }
        }
        this.setGameConnectionData({
          password: connectPassword,
        })
          .then(() => {
            this.$router.push({
              name: 'game',
              params: { gameId: game.id },
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

.game-information
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
